using Core.Domain.Entities;
using Core.Repositories.CheckPleaseRepository;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System.Globalization;
using System.Text;

namespace Queries.Queries.Parser.GetRepairsBackup
{
    public class GetRepairsBackupQueryHandler(
        ICheckPleaseRepository<Repair> repairRepository,
        IConfiguration configuration
        ) : IRequestHandler<GetRepairsBackupQuery>
    {
        private readonly ICheckPleaseRepository<Repair> repairRepository = repairRepository;
        private readonly IConfiguration configuration = configuration;

        public async Task Handle(GetRepairsBackupQuery request, CancellationToken cancellationToken)
        {
            var repairs = await repairRepository.GetAll()
                .Include(r => r.Client)
                .Include(r => r.Car)
                .Include(r => r.Details)
                .OrderBy(r => r.RepairDate)
                .Where(x => x.RepairDate.HasValue)
                .ToListAsync(cancellationToken);

            var result = new StringBuilder();

            foreach (var repair in repairs)
            {
                result.AppendLine($"{repair.Client.FullName};{repair.Client.PhoneNumber}");
                result.AppendLine($"{repair.Car.CarSign};{repair.Car.Mileage}");
                result.AppendLine(";");

                foreach (var detail in repair.Details)
                {
                    result.AppendLine($"{detail.DetailName};{detail.PricePerOne};{detail.DetailsPrice};{detail.RepairPrice};{detail.TotalPrice}");
                }

                result.AppendLine(";");

                result.AppendLine($"{repair.Mileage};{repair.TotalRepairPrice}");
                result.AppendLine(repair.RepairDate.Value.ToString("dd/MM/yyyy", CultureInfo.InvariantCulture));
                result.AppendLine("*");
            }

            if (result.Length > 0)
            {
                result.Length -= 1;
            }

            string filePath = configuration.GetConnectionString("filePathForBachup");
            File.WriteAllText(filePath, result.ToString());
        }
    }
}
