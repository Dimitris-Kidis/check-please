using AutoMapper;
using Common.Exceptions;
using Core.Domain.Entities;
using Core.Repositories.CheckPleaseRepository;
using Core.Services.EntityValidator;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Commands.Commands.Repairs.UpdateRepair
{
    //public class UpdateRepairCommandHandler(
    //        ICheckPleaseRepository<Repair> repairRepository,
    //        IEntityValidatorService<Repair> repairValidator,
    //        IMapper mapper
    //    ) : IRequestHandler<UpdateRepairCommand>
    //{
    //    private readonly ICheckPleaseRepository<Repair> repairRepository = repairRepository;
    //    private readonly IEntityValidatorService<Repair> repairValidator = repairValidator;
    //    private readonly IMapper _mapper = mapper;

    //    public async Task Handle(UpdateRepairCommand request, CancellationToken cancellationToken)
    //    {
    //        await repairValidator.EntityExistsAsync(request.Id, cancellationToken);
    //        var calendarEvent = await repairRepository.GetByIdAsync(request.Id, cancellationToken);
    //        _mapper.Map(request, calendarEvent);
    //        await repairRepository.UpdateAsync(calendarEvent, cancellationToken);
    //    }
    //}

    public class UpdateRepairCommandHandler(
        ICheckPleaseRepository<Repair> repairRepository,
        IEntityValidatorService<Repair> repairValidator,
        IMapper mapper
    ) : IRequestHandler<UpdateRepairCommand>
    {
        private readonly ICheckPleaseRepository<Repair> repairRepository = repairRepository;
        private readonly IEntityValidatorService<Repair> repairValidator = repairValidator;
        private readonly IMapper _mapper = mapper;

        public async Task Handle(UpdateRepairCommand request, CancellationToken cancellationToken)
        {
            await repairValidator.EntityExistsAsync(request.Id, cancellationToken);

            var repair = await repairRepository
                .GetAll()
                .Include(x => x.Details)
                .Where(r => r.Id == request.Id)
                .FirstOrDefaultAsync(cancellationToken);

            if (repair == null)
            {
                throw new BusinessValidationException("Repair not found");
            }

            _mapper.Map(request, repair);

            foreach (var updateDetail in request.Details)
            {
                var existingDetail = repair.Details.FirstOrDefault(d => d.Id == updateDetail.Id);

                if (existingDetail != null)
                {
                    _mapper.Map(updateDetail, existingDetail);
                }
                else
                {
                    var newDetail = _mapper.Map<Detail>(updateDetail);
                    repair.Details.Add(newDetail);
                }
            }

            var detailsToRemove = repair.Details
                .Where(d => !request.Details.Any(rd => rd.Id == d.Id))
                .ToList();

            foreach (var detailToRemove in detailsToRemove)
            {
                repair.Details.Remove(detailToRemove);
            }

            var totalRepairPrice = request.Details
                .Sum(detail => (detail.PricePerOne.GetValueOrDefault(0) * detail.Quantity.GetValueOrDefault(0)) + detail.RepairPrice);

            repair.TotalRepairPrice = totalRepairPrice;

            await repairRepository.UpdateAsync(repair, cancellationToken);
        }
    }

}
