using MediatR;
using Queries.DTOs;
using Queries.Queries.Repairs.GetReport;
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

                if (!messageText.StartsWith("репорт"))
                {
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

                type = typeMatch.Groups[1].Value.Trim() switch // REFACTOR
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

        }
        private async Task SendReportAsync(long chatId, ReportDto report, CancellationToken cancellationToken)
        {
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

            await _botClient.SendMessage(chatId, report.Message, cancellationToken: cancellationToken);
        }
    }
}
