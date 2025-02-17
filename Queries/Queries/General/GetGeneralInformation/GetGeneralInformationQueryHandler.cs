using Core.Domain.Entities;
using Core.Repositories.CheckPleaseRepository;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Queries.DTOs;

namespace Queries.Queries.General.GetGeneralInformation
{
    public class GetGeneralInformationQueryHandler(
        ICheckPleaseRepository<Repair> repairRepository,
        ICheckPleaseRepository<Client> clientRepository,
        ICheckPleaseRepository<Car> carRepository
        ) : IRequestHandler<GetGeneralInformationQuery, GeneralInformationDto>
    {
        private readonly ICheckPleaseRepository<Repair> repairRepository = repairRepository;
        private readonly ICheckPleaseRepository<Client> clientRepository = clientRepository;
        private readonly ICheckPleaseRepository<Car> carRepository = carRepository;

        public async Task<GeneralInformationDto> Handle(GetGeneralInformationQuery request, CancellationToken cancellationToken)
        {
            int clientsNumber = await clientRepository.GetAll().CountAsync(cancellationToken);
            int carsNumber = await carRepository.GetAll().CountAsync(cancellationToken);
            int repairsNumber = await repairRepository.GetAll().CountAsync(cancellationToken);

            int thisYearRepairsNumber = await repairRepository.GetAll()
                .Where(r => r.RepairDate.HasValue && r.RepairDate.Value.Year == DateTime.UtcNow.Year)
                .CountAsync(cancellationToken);

            return new GeneralInformationDto
            {
                ClientsNumber = clientsNumber,
                CarsNumber = carsNumber,
                RepairsNumber = repairsNumber,
                ThisYearRepairsNumber = thisYearRepairsNumber,
            };
        }
    }
}
