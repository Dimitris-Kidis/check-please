using MediatR;
using Queries.DTOs;
using Queries.Queries.General.GetGeneralInformation;
using Queries.Queries.Parser.GetRepairsBackup;
using Queries.Queries.Repairs.GetRepairCheck;
using Queries.Queries.Repairs.GetReport;
using System.Text;
using System.Text.RegularExpressions;
using Telegram.Bot;
using Telegram.Bot.Types;
using Telegram.Bot.Types.Enums;
using static Common.Enums.LanguageLocaleEnum;
using static Common.Enums.ReportTypeEnum;

namespace CheckPlease.Bot
{
    public class TelegramBotService(string token, IMediator mediator, IConfiguration configuration)
    {
        private TelegramBotClient _botClient = new TelegramBotClient(token);
        private readonly IMediator _mediator = mediator;
        private readonly IConfiguration configuration = configuration;

        public void Start()
        {
            _botClient.StartReceiving(UpdateHandler, ErrorHandler);
        }

        private Task ErrorHandler(ITelegramBotClient client, Exception exception, CancellationToken cancellationToken)
        {
            Console.WriteLine($"Ошибка: {exception.Message}");
            return Task.CompletedTask;
        }

        private async Task UpdateHandler(ITelegramBotClient client, Update update, CancellationToken cancellationToken)
        {
            if (update.Type == UpdateType.Message && update.Message?.Text != null)
            {
                var chatId = update.Message.Chat.Id;

                var chatIdstring = configuration.GetConnectionString("telegramChatId");
                var chatIdLong = long.Parse(chatIdstring);

                if (chatId != chatIdLong)
                {
                    throw new Exception("You don't have permisson to perform that action.");
                }

                var messageText = update.Message.Text.Trim().ToLower();

                await SendCommand(chatId, messageText, cancellationToken);
            }

        }

        public async Task SendCommand(long chatId, string messageText, CancellationToken cancellationToken)
        {
            var chatIdstring = configuration.GetConnectionString("telegramChatId");
            var chatIdLong = long.Parse(chatIdstring);

            if (chatId != chatIdLong)
            {
                throw new Exception("You don't have permisson to perform that action.");
            }

            if (messageText.Equals("бекап"))
            {
                await _mediator.Send(new GetRepairsBackupQuery());

                string filePath = configuration.GetConnectionString("filePathForBachup");

                await using Stream stream = File.OpenRead(filePath);
                var caption = $"Бекап данных за {DateTimeOffset.Now:dd-MM-yyyy HH:mm}";

                await _botClient.SendDocument(
                    chatId: chatId,
                    document: stream,
                    caption: caption,
                    cancellationToken: cancellationToken
                );

                await _botClient.SendMessage(chatId, caption, parseMode: ParseMode.Html, cancellationToken: cancellationToken);

                return;
            }

            if (messageText.StartsWith("отправить"))
            {
                Guid repairId = Guid.Parse(messageText.Split(":").Last());
                await SendRepairAsync(chatId, repairId, cancellationToken);
            }

            if (!messageText.StartsWith("репорт"))
            {
                return;
            }

            if (messageText.Equals("репорт"))
            {
                await SendGeneralInformationAsync(chatId, cancellationToken);

                return;
            }

            var typePattern = @"(?<=:)([^(\r\n\(\[]+)(?=\s*\(|\s*\[|$)";
            var langPattern = @"\(([^)]+)\)";
            var carSignPattern = @"\[(.*?)\]";

            var typeMatch = Regex.Match(messageText, typePattern);
            var langMatch = Regex.Match(messageText, langPattern);
            var paramMatch = Regex.Match(messageText, carSignPattern);

            ReportType type;
            LanguageLocale lang;

            type = typeMatch.Groups[1].Value.Trim() switch
            {
                "неотправленные" => ReportType.Unsent,
                "сегодня" => ReportType.Day,
                "неделя" => ReportType.Week,
                "месяц" => ReportType.Month,
                "машина" => ReportType.AllReportsForCar,
                "клиент" => ReportType.AllReportsForClient,
                _ => ReportType.Unsent
            };

            lang = langMatch.Groups[1].Value.Trim().ToLower() switch
            {
                "ru" => LanguageLocale.Ru,
                "ro" => LanguageLocale.Ro,
                _ => LanguageLocale.Ru
            };

            var query = new GetReportQuery { Type = type, Locale = lang };

            if (paramMatch.Success)
            {
                string param = paramMatch.Groups[1].Value.Trim().ToUpper();

                if (type == ReportType.AllReportsForCar)
                {
                    query.CarSign = param;
                }
                else if (type == ReportType.AllReportsForClient)
                {
                    query.PhoneNumber = param;
                }
            }

            var result = await _mediator.Send(query, cancellationToken);

            await SendReportAsync(chatId, result, cancellationToken);
        }

        public async Task SendReportAsync(long chatId, ReportDto report, CancellationToken cancellationToken)
        {
            if (report.Files.Count == 0)
            {
                await _botClient.SendMessage(chatId, "Машины не найдены. Убедитесь, что вы ввели правильные данные.", parseMode: ParseMode.Html, cancellationToken: cancellationToken);
                return;
            }

            foreach (var file in report.Files)
            {
                var inputFile = new InputFileStream(file.FileStream, file.FileName);

                await _botClient.SendDocument(
                    chatId: chatId,
                    document: inputFile,
                    caption: $"{file.FileName}",
                    cancellationToken: cancellationToken
                );
            }

            await _botClient.SendMessage(chatId, report.Message, parseMode: ParseMode.Html, cancellationToken: cancellationToken);
        }

        public async Task SendRepairAsync(long chatId, Guid repairId, CancellationToken cancellationToken)
        {
            var query = new GetRepairCheckQuery { Id = repairId };

            var result = await _mediator.Send(query, cancellationToken);

            var inputFile = new InputFileStream(result.FileStream, result.FileName);

            await _botClient.SendDocument(
                chatId: chatId,
                document: inputFile,
                caption: $"{result.FileName}",
                cancellationToken: cancellationToken
            );
        }

        private async Task SendGeneralInformationAsync(long chatId, CancellationToken cancellationToken)
        {
            var generalInformation = await _mediator.Send(new GetGeneralInformationQuery(), cancellationToken);

            string message = FormatGeneralInformationMessage(generalInformation);

            await _botClient.SendMessage(chatId, message, parseMode: ParseMode.Html, cancellationToken: cancellationToken);
        }

        private static string FormatGeneralInformationMessage(GeneralInformationDto generalInformation)
        {
            var messageText = new StringBuilder();

            messageText.AppendLine($"<b>Общая информация</b>");
            messageText.AppendLine("<code>");
            messageText.AppendLine($"Всего клиентов: <b>{generalInformation.ClientsNumber}</b>");
            messageText.AppendLine($"Всего машин: <b>{generalInformation.CarsNumber}</b>");
            messageText.AppendLine($"Всего ремонтов: <b>{generalInformation.RepairsNumber}</b>");
            messageText.AppendLine($"Всего ремонтов в этом году: <b>{generalInformation.ThisYearRepairsNumber}</b>");
            messageText.AppendLine("</code>");

            return messageText.ToString();
        }

    }
}
