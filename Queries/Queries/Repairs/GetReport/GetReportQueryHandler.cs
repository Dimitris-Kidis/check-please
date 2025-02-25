using Core.Domain.Entities;
using Core.Repositories.CheckPleaseRepository;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Queries.DTOs;
using Queries.Queries.Repairs.GetRepairCheck;
using System.Text;
using static Common.Enums.LanguageLocaleEnum;
using static Common.Enums.ReportTypeEnum;

namespace Queries.Queries.Repairs.GetReport
{
    public class GetReportQueryHandler(
        ICheckPleaseRepository<Repair> repairRepository,
        IMediator mediator) : IRequestHandler<GetReportQuery, ReportDto>
    {
        private readonly ICheckPleaseRepository<Repair> repairRepository = repairRepository;
        private readonly IMediator mediator = mediator;

        public async Task<ReportDto> Handle(GetReportQuery request, CancellationToken cancellationToken)
        {
            DateTime? startDate = null, endDate = null;
            List<Guid> repairIds = [];
            var messageText = new StringBuilder();
            ReportDto report = new();

            var query = repairRepository.GetAll();

            (query, startDate, endDate, messageText) = GetQueryForReportType(request, query, messageText);

            repairIds = await query
                .Select(r => r.Id)
                .ToListAsync(cancellationToken);

            await repairRepository.UpdateAsync(x => repairIds.Contains(x.Id), x => new Repair { IsSentToBot = true }, cancellationToken);

            var repairsTextInfo = new StringBuilder();

            (var mechanicIncome, var assistantIncome) = await ProcessRepairs(repairIds, report, request.Locale, repairsTextInfo, cancellationToken);

            messageText.AppendLine($"<code>Общее количество ремонтов: <b>{repairIds.Count}</b>");
            messageText.AppendLine($"Заработок механика: <b>{mechanicIncome}</b>");
            messageText.AppendLine($"Заработок ассистента: <b>{assistantIncome}</b>");
            messageText.AppendLine("\nМашины:</code>");
            messageText.Append(repairsTextInfo);

            return new ReportDto
            {
                Message = messageText.ToString(),
                Files = report.Files,
            };
        }

        private static (IQueryable<Repair>, DateTime?, DateTime?, StringBuilder) GetQueryForReportType(GetReportQuery request, IQueryable<Repair> query, StringBuilder messageText)
        {
            DateTime? startDate = null, endDate = null;

            switch (request.Type)
            {
                case ReportType.Unsent:
                    query = query.Where(x => x.IsSentToBot != true);
                    break;
                case ReportType.AllReportsForCar:
                    query = query.Include(x => x.Car).Where(x => x.Car.CarSign.ToUpper() == request.CarSign && request.CarSign != null);
                    break;
                case ReportType.Day:
                    startDate = DateTime.UtcNow.Date;
                    endDate = startDate;
                    messageText.AppendLine($"<b>Дата</b>: <code>{startDate:dd.MM.yyyy}</code>\n");
                    break;
                case ReportType.Week:
                    startDate = DateTime.UtcNow.Date.AddDays(-(int)DateTime.UtcNow.DayOfWeek + (int)DayOfWeek.Monday);
                    endDate = startDate?.AddDays(6);
                    messageText.AppendLine($"<b>Дата</b>: <code>{startDate:dd.MM.yyyy} - {endDate:dd.MM.yyyy}</code>\n");
                    break;
                case ReportType.Month:
                    startDate = new DateTime(DateTime.UtcNow.Year, DateTime.UtcNow.Month, 1);
                    endDate = startDate?.AddMonths(1).AddDays(-1);
                    messageText.AppendLine($"<b>Дата</b>: <code>{startDate:dd.MM.yyyy} - {endDate:dd.MM.yyyy}</code>\n");
                    break;
                default:
                    throw new ArgumentException("Invalid report type");
            }

            if (startDate.HasValue && endDate.HasValue)
            {
                query = query.Where(r => r.RepairDate.HasValue && r.RepairDate.Value.Date >= startDate.Value.Date && r.RepairDate.Value.Date <= endDate.Value.Date);
            }

            return (query, startDate, endDate, messageText);
        }

        private async Task<(int mechanicIncome, int assistantIncome)> ProcessRepairs(List<Guid> repairIds, ReportDto report, LanguageLocale locale, StringBuilder repairsTextInfo, CancellationToken cancellationToken)
        {
            int mechanicIncome = 0;
            int assistantIncome = 0;
            int index = 1;
            foreach (var repairId in repairIds)
            {
                var file = await mediator.Send(new GetRepairCheckQuery { Id = repairId, Locale = locale }, cancellationToken);
                report.Files.Add(file);

                var repair = await repairRepository
                    .GetAll()
                    .Include(x => x.Car)
                    .Include(x => x.Client)
                    .Where(r => r.Id == repairId)
                    .Select(x => new
                    {
                        x.Car.CarSign,
                        ClientName = x.Client.FullName,
                        ClientPhoneNumber = x.Client.PhoneNumber,
                        x.TotalRepairPrice,
                        AssistantIncome = x.TotalRepairPrice > 300 ? 50 : 20,
                        x.RepairDate
                    })
                    .SingleAsync(cancellationToken);

                mechanicIncome += repair.TotalRepairPrice;
                assistantIncome += repair.AssistantIncome;

                repairsTextInfo.AppendLine($"{index}. {repair.CarSign} ({repair.ClientName}, {repair.ClientPhoneNumber}) [{repair.AssistantIncome}] [{repair.RepairDate:dd.MM.yyyy}]");
                index++;
            }

            return (mechanicIncome, assistantIncome);
        }
    }
}
