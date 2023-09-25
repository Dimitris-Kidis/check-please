using ApplicationCore.Services.Repository.CheckRepository;
using Command.Clients.CreateClient;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Command.Repair.CreateRepair
{
    public class CreateRepairCommandHandler : IRequestHandler<CreateRepairCommand, int>
    {
        private readonly ICheckRepository<ApplicationCore.Domain.Entities.Repair> _repairRepository;
        private readonly ICheckRepository<ApplicationCore.Domain.Entities.Detail> _detailRepository;
        private readonly ICheckRepository<ApplicationCore.Domain.Entities.Car> _carRepository;
        public CreateRepairCommandHandler(
            ICheckRepository<ApplicationCore.Domain.Entities.Repair> repairRepository,
            ICheckRepository<ApplicationCore.Domain.Entities.Detail> detailRepository,
            ICheckRepository<ApplicationCore.Domain.Entities.Car> carRepository
            )
        {
            _repairRepository = repairRepository;
            _detailRepository = detailRepository;
            _carRepository = carRepository;
        }
        public Task<int> Handle(CreateRepairCommand request, CancellationToken cancellationToken)
        {
            var carsMileage = _carRepository.FindBy(car => car.Id == request.CarId).FirstOrDefault().Mileage;

            var newRepair = new ApplicationCore.Domain.Entities.Repair
            {
                Problems = request.Problems,
                ClientId = request.ClientId,
                CarId = request.CarId,
                Mileage = carsMileage,
                Details = request.Details.Select(detail => new ApplicationCore.Domain.Entities.Detail
                {
                    DetailName = detail.DetailName,
                    PricePerOne = detail.PricePerOne,
                    Quantity = detail.Quantity,
                    DetailsPrice = ((detail.PricePerOne ?? 0) * (detail.Quantity ?? 0)),
                    RepairPrice = detail.RepairPrice,
                    TotalPrice = ((detail.PricePerOne ?? 0) * (detail.Quantity ?? 0)) + detail.RepairPrice,
                    CreatedBy = "admin",
                    CreatedAt = DateTime.UtcNow
                }).ToList()
            };

            _repairRepository.Add(newRepair);
            _repairRepository.Save();

            var resultId = newRepair.Id;
            return Task.FromResult(resultId);
        }
    }
}
