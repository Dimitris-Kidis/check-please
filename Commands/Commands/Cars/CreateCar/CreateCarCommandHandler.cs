using AutoMapper;
using Common.Exceptions;
using Core.Domain.Entities;
using Core.Repositories.CheckPleaseRepository;
using MediatR;

namespace Commands.Commands.Cars.CreateCar
{
    public class CreateCarCommandHandler(
        ICheckPleaseRepository<Car> carRepository,
        IMapper mapper
    ) : IRequestHandler<CreateCarCommand, Guid>
    {
        private readonly ICheckPleaseRepository<Car> carRepository = carRepository;
        private readonly IMapper _mapper = mapper;

        public async Task<Guid> Handle(CreateCarCommand request, CancellationToken cancellationToken)
        {
            var isExistingNumber = carRepository.GetAll().Where(x => x.CarSign == request.CarSign).Any();

            if (isExistingNumber)
            {
                throw new BusinessValidationException("Car with such car sign already exists");
            }

            var car = _mapper.Map<Car>(request);

            await carRepository.AddAsync(car, cancellationToken);

            return car.Id;
        }
    }
}
