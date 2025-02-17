using AutoMapper;
using Core.Domain.Entities;
using Core.Repositories.CheckPleaseRepository;
using MediatR;

namespace Commands.Commands.Repairs.CreateRepair
{
    public class CreateRepairCommandHandler(
            ICheckPleaseRepository<Repair> repairRepository,
            IMapper mapper
        ) : IRequestHandler<CreateRepairCommand, Guid>
    {
        private readonly ICheckPleaseRepository<Repair> repairRepository = repairRepository;
        private readonly IMapper _mapper = mapper;

        public async Task<Guid> Handle(CreateRepairCommand request, CancellationToken cancellationToken)
        {
            var repair = _mapper.Map<Repair>(request);

            await repairRepository.AddAsync(repair, cancellationToken);

            return repair.Id;
        }
    }
}
