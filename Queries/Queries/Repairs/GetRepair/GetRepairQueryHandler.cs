using AutoMapper;
using AutoMapper.QueryableExtensions;
using Core.Domain.Entities;
using Core.Repositories.CheckPleaseRepository;
using Core.Services.EntityValidator;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Queries.DTOs;

namespace Queries.Queries.Repairs.GetRepair
{
    public class GetRepairQueryHandler(
        ICheckPleaseRepository<Repair> repairRepository,
        IEntityValidatorService<Repair> repairValidator,
        IMapper mapper) : IRequestHandler<GetRepairQuery, RepairDto>
    {
        private readonly ICheckPleaseRepository<Repair> repairRepository = repairRepository;
        private readonly IEntityValidatorService<Repair> repairValidator = repairValidator;
        private readonly IMapper _mapper = mapper;

        public async Task<RepairDto> Handle(GetRepairQuery request, CancellationToken cancellationToken)
        {
            await repairValidator.EntityExistsAsync(request.Id, cancellationToken);

            return await repairRepository
                .GetAll()
                .Where(x => x.Id == request.Id)
                .ProjectTo<RepairDto>(_mapper.ConfigurationProvider)
                .SingleAsync(cancellationToken);
        }
    }
}
