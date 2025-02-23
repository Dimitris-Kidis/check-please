using AutoMapper;
using Commands.Commands.Repairs.CreateRepair;
using Core.Domain.Entities;
using Core.Repositories.CheckPleaseRepository;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Commands.Commands.Parser.RestoreDbDataByParsedData
{
    public class RestoreDbDataByParsedDataCommandHandler(
        ICheckPleaseRepository<Client> clientRepository,
        ICheckPleaseRepository<Car> carRepository,
        ICheckPleaseRepository<Repair> repairRepository,
        IMapper mapper
    ) : IRequestHandler<RestoreDbDataByParsedDataCommand>
    {
        private readonly ICheckPleaseRepository<Client> clientRepository = clientRepository;
        private readonly ICheckPleaseRepository<Car> carRepository = carRepository;
        private readonly ICheckPleaseRepository<Repair> repairRepository = repairRepository;
        private readonly IMapper _mapper = mapper;

        public async Task Handle(RestoreDbDataByParsedDataCommand request, CancellationToken cancellationToken)
        {
            Client? client = await clientRepository.GetAll().FirstOrDefaultAsync(x => x.PhoneNumber == request.Client.PhoneNumber, cancellationToken);

            if (client == null)
            {
                client = new Client
                {
                    PhoneNumber = request.Client.PhoneNumber,
                    FullName = request.Client.FullName,
                };

                await clientRepository.AddAsync(client, cancellationToken);
            }

            Car? car = await carRepository.GetAll().FirstOrDefaultAsync(x => x.CarSign == request.Car.CarSign, cancellationToken);

            if (car == null)
            {
                car = new Car
                {
                    CarSign = request.Car.CarSign,
                    Mileage = request.Car.Mileage,
                };

                await carRepository.AddAsync(car, cancellationToken);
            }
            else
            {
                car.Mileage = request.Car.Mileage;
                await carRepository.UpdateAsync(car, cancellationToken);
            }

            var repairCommand = new CreateRepairCommand
            {
                CarId = car.Id,
                ClientId = client.Id,
                TotalRepairPrice = request.TotalRepairPrice,
                RepairDate = request.RepairDate,
                Details = request.Details,
                Mileage = request.Mileage,
            };

            var repair = _mapper.Map<Repair>(repairCommand);

            await repairRepository.AddAsync(repair, cancellationToken);
        }
    }
}
