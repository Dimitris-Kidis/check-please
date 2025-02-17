using AutoMapper;
using Core.Domain.Entities;
using Core.Repositories.CheckPleaseRepository;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Queries.DTOs;
using Queries.Queries.Repairs.GetRepairCheck;
using static Common.Enums.ReportTypeEnum;

namespace Queries.Queries.Repairs.GetReport // REFACTOR
{
    public class GetReportQueryHandler(
        ICheckPleaseRepository<Repair> repairRepository,
        IMediator mediator,
        IMapper mapper) : IRequestHandler<GetReportQuery, ReportDto>
    {
        private readonly ICheckPleaseRepository<Repair> repairRepository = repairRepository;
        private readonly IMediator mediator = mediator;
        private readonly IMapper mapper = mapper;

        public async Task<ReportDto> Handle(GetReportQuery request, CancellationToken cancellationToken)
        {
            DateTime startDate = DateTime.MinValue, endDate = DateTime.MinValue;
            List<Guid> repairIds = [];
            string messageText = "";
            ReportDto report = new();

            var query = repairRepository.GetAll();

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
                    messageText += $"Дата: {startDate:dd.MM.yyyy}\n\n";
                    break;
                case ReportType.Week:
                    startDate = DateTime.UtcNow.Date.AddDays(-(int)DateTime.UtcNow.DayOfWeek + (int)DayOfWeek.Monday);
                    endDate = startDate.AddDays(6);
                    messageText += $"Дата: {startDate:dd.MM.yyyy} - {endDate:dd.MM.yyyy}\n\n";
                    break;
                case ReportType.Month:
                    startDate = new DateTime(DateTime.UtcNow.Year, DateTime.UtcNow.Month, 1);
                    endDate = startDate.AddMonths(1).AddDays(-1);
                    messageText += $"Дата: {startDate:dd.MM.yyyy} - {endDate:dd.MM.yyyy}\n\n";
                    break;
                default:
                    throw new ArgumentException("Invalid report type");
            }

            if (request.Type == ReportType.Day || request.Type == ReportType.Week || request.Type == ReportType.Month)
            {
                query = query.Where(r => r.RepairDate.HasValue && r.RepairDate.Value.Date >= startDate.Date && r.RepairDate.Value.Date <= endDate.Date);
            }

            repairIds = await query
                .Select(r => r.Id)
                .ToListAsync(cancellationToken);

            int index = 1;
            var repairsTextInfo = "";
            int mechanicIncome = 0;
            int assistantIncome = 0;
            foreach (var repairId in repairIds)
            {
                var file = await mediator.Send(new GetRepairCheckQuery { Id = repairId, Locale = request.Locale }, cancellationToken);
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

                repairsTextInfo += $"{index}. {repair.CarSign} ({repair.ClientName}, {repair.ClientPhoneNumber}) [{repair.AssistantIncome}] [{repair.RepairDate:dd.MM.yyyy}]\n";
                index++;
            }

            messageText += $"Общее количество ремонтов: {repairIds.Count}\n";
            messageText += $"Заработок механика: {mechanicIncome}\n";
            messageText += $"Заработок ассистента: {assistantIncome}\n";
            messageText += $"Машины:\n";
            messageText += repairsTextInfo;


            return new ReportDto
            {
                Message = messageText,
                Files = report.Files,
            };
        }
    }
}
