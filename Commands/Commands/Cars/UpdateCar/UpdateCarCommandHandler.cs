using AutoMapper;
using Core.Domain.Entities;
using Core.Repositories.CheckPleaseRepository;
using Core.Services.EntityValidator;
using MediatR;

namespace Commands.Commands.Cars.UpdateCar
{
    public class UpdateCarCommandHandler(
        ICheckPleaseRepository<Car> carRepository,
        IEntityValidatorService<Car> carValidator,
        IMapper mapper
    ) : IRequestHandler<UpdateCarCommand>
    {
        private readonly ICheckPleaseRepository<Car> carRepository = carRepository;
        private readonly IEntityValidatorService<Car> carValidator = carValidator;
        private readonly IMapper _mapper = mapper;

        public async Task Handle(UpdateCarCommand request, CancellationToken cancellationToken)
        {
            await carValidator.EntityExistsAsync(request.Id, cancellationToken);
            var calendarEvent = await carRepository.GetByIdAsync(request.Id, cancellationToken);
            _mapper.Map(request, calendarEvent);
            await carRepository.UpdateAsync(calendarEvent, cancellationToken);
        }
    }
}
