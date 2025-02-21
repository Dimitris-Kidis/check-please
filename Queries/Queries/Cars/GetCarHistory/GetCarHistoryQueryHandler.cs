using AutoMapper;
using AutoMapper.QueryableExtensions;
using Core.Domain.Entities;
using Core.Repositories.CheckPleaseRepository;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Queries.DTOs;

namespace Queries.Queries.Cars.GetCarHistory
{
    public class GetCarHistoryQueryHandler(
        ICheckPleaseRepository<Car> carRepository,
        ICheckPleaseRepository<Repair> repairRepository,
        IMapper mapper) : IRequestHandler<GetCarHistoryQuery, IEnumerable<RepairDto>>
    {
        private readonly ICheckPleaseRepository<Car> carRepository = carRepository;
        private readonly ICheckPleaseRepository<Repair> repairRepository = repairRepository;
        private readonly IMapper _mapper = mapper;

        public async Task<IEnumerable<RepairDto>> Handle(GetCarHistoryQuery request, CancellationToken cancellationToken)
        {
            return await repairRepository
                .GetAll()
                .Where(x => x.CarId == request.Id)
                .OrderByDescending(x => x.RepairDate)
                .ProjectTo<RepairDto>(_mapper.ConfigurationProvider)
                .ToListAsync(cancellationToken);
        }
    }
}
