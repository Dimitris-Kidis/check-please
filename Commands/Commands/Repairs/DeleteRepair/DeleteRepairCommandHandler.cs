using Core.Domain.Entities;
using Core.Repositories.CheckPleaseRepository;
using Core.Services.EntityValidator;
using MediatR;

namespace Commands.Commands.Repairs.DeleteRepair
{
    public class DeleteRepairCommandHandler(
            ICheckPleaseRepository<Repair> repairRepository,
            IEntityValidatorService<Repair> repairValidator
        ) : IRequestHandler<DeleteRepairCommand>
    {
        private readonly ICheckPleaseRepository<Repair> repairRepository = repairRepository;
        private readonly IEntityValidatorService<Repair> repairValidator = repairValidator;

        public async Task Handle(DeleteRepairCommand request, CancellationToken cancellationToken)
        {
            await repairValidator.EntityExistsAsync(request.Id, cancellationToken);
            Repair repair = await repairRepository.GetByIdAsync(request.Id, cancellationToken);
            await repairRepository.DeleteAsync(repair, cancellationToken);
        }
    }
}
