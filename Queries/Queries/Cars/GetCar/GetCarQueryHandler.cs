using AutoMapper;
using AutoMapper.QueryableExtensions;
using Core.Domain.Entities;
using Core.Repositories.CheckPleaseRepository;
using Core.Services.EntityValidator;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Queries.DTOs;

namespace Queries.Queries.Cars.GetCar
{
    public class GetCarQueryHandler(
    ICheckPleaseRepository<Car> carRepository,
    IEntityValidatorService<Car> carValidator,
    IMapper mapper) : IRequestHandler<GetCarQuery, CarDto>
    {
        private readonly ICheckPleaseRepository<Car> carRepository = carRepository;
        private readonly IEntityValidatorService<Car> carValidator = carValidator;
        private readonly IMapper _mapper = mapper;

        public async Task<CarDto> Handle(GetCarQuery request, CancellationToken cancellationToken)
        {
            await carValidator.EntityExistsAsync(request.Id, cancellationToken);

            return await carRepository
                .GetAll()
                .Where(x => x.Id == request.Id)
                .ProjectTo<CarDto>(_mapper.ConfigurationProvider)
                .SingleAsync(cancellationToken);
        }
    }
}
