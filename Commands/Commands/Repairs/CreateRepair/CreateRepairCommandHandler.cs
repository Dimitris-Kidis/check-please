using AutoMapper;
using Core.Domain.Entities;
using Core.Repositories.CheckPleaseRepository;
using MediatR;

namespace Commands.Commands.Repairs.CreateRepair
{
    public class CreateRepairCommandHandler(
            ICheckPleaseRepository<Repair> repairRepository,
            ICheckPleaseRepository<Car> carRepository,
            IMapper mapper
        ) : IRequestHandler<CreateRepairCommand, Guid>
    {
        private readonly ICheckPleaseRepository<Repair> repairRepository = repairRepository;
        private readonly ICheckPleaseRepository<Car> carRepository = carRepository;
        private readonly IMapper _mapper = mapper;

        public async Task<Guid> Handle(CreateRepairCommand request, CancellationToken cancellationToken)
        {
            var repair = _mapper.Map<Repair>(request);

            var totalRepairPrice = request.Details
                .Sum(detail => (detail.PricePerOne.GetValueOrDefault(0) * detail.Quantity.GetValueOrDefault(0)) + detail.RepairPrice);

            repair.TotalRepairPrice = totalRepairPrice;

            await repairRepository.AddAsync(repair, cancellationToken);

            await carRepository.UpdateAsync(x => x.Id == request.CarId, x => new Car { Mileage = request.Mileage }, cancellationToken);

            return repair.Id;
        }
    }
}
