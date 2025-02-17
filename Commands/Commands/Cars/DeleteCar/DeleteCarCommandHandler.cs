using Core.Domain.Entities;
using Core.Repositories.CheckPleaseRepository;
using Core.Services.EntityValidator;
using MediatR;

namespace Commands.Commands.Cars.DeleteCar
{
    public class DeleteCarCommandHandler(
        ICheckPleaseRepository<Car> carRepository,
        IEntityValidatorService<Car> carValidator
    ) : IRequestHandler<DeleteCarCommand>
    {
        private readonly ICheckPleaseRepository<Car> carRepository = carRepository;
        private readonly IEntityValidatorService<Car> carValidator = carValidator;

        public async Task Handle(DeleteCarCommand request, CancellationToken cancellationToken)
        {
            await carValidator.EntityExistsAsync(request.Id, cancellationToken);
            Car calendarEvent = await carRepository.GetByIdAsync(request.Id, cancellationToken);
            await carRepository.DeleteAsync(calendarEvent, cancellationToken);
        }
    }
}
