using MediatR;
using Queries.DTOs;
using Queries.Queries.General.GetGeneralInformation;
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
    public class TelegramBotService(string token, IMediator mediator)
    {
        private TelegramBotClient _botClient = new TelegramBotClient(token);
        private readonly IMediator _mediator = mediator;

        public void Start()
        {
            _botClient.StartReceiving(UpdateHandler, ErrorHandler);
        }

        private Task ErrorHandler(ITelegramBotClient client, Exception exception, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }

        private async Task UpdateHandler(ITelegramBotClient client, Update update, CancellationToken cancellationToken)
        {
            if (update.Type == UpdateType.Message && update.Message?.Text != null)
            {
                var chatId = update.Message.Chat.Id;
                var messageText = update.Message.Text.Trim().ToLower();

                await SendCommand(chatId, messageText, cancellationToken);
            }

        }
        public async Task SendReportAsync(long chatId, ReportDto report, CancellationToken cancellationToken)
        {
            if (report.Files.Count == 0)
            {
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

        public async Task SendCommand(long chatId, string messageText, CancellationToken cancellationToken)
        {
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
            var carSignMatch = Regex.Match(messageText, carSignPattern);

            ReportType type;
            LanguageLocale lang;
            string carSign = null;

            type = typeMatch.Groups[1].Value.Trim() switch
            {
                "неотправленные" => ReportType.Unsent,
                "сегодня" => ReportType.Day,
                "неделя" => ReportType.Week,
                "месяц" => ReportType.Month,
                "машина" => ReportType.AllReportsForCar,
                _ => ReportType.Unsent
            };

            lang = langMatch.Groups[1].Value.Trim().ToLower() switch
            {
                "ru" => LanguageLocale.Ru,
                "ro" => LanguageLocale.Ro,
                _ => LanguageLocale.Ru
            };

            if (carSignMatch.Success)
            {
                carSign = carSignMatch.Groups[1].Value.Trim().ToUpper();
            }

            var query = new GetReportQuery { Type = type, Locale = lang, CarSign = carSign };

            var result = await _mediator.Send(query, cancellationToken);

            await SendReportAsync(chatId, result, cancellationToken);
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
