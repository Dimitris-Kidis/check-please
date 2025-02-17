using AutoMapper;
using AutoMapper.QueryableExtensions;
using Core.Domain.Entities;
using Core.Repositories.CheckPleaseRepository;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Queries.DTOs;

namespace Queries.Queries.Cars.GetCarSuggestionsByPhoneNumber
{
    public class GetCarSuggestionsByPhoneNumberQueryHandler(
    ICheckPleaseRepository<Car> carRepository,
    ICheckPleaseRepository<Client> clientRepository,
    IMapper mapper) : IRequestHandler<GetCarSuggestionsByPhoneNumberQuery, IEnumerable<CarDto>>
    {
        private readonly ICheckPleaseRepository<Car> carRepository = carRepository;
        private readonly ICheckPleaseRepository<Client> clientRepository = clientRepository;
        private readonly IMapper _mapper = mapper;

        public async Task<IEnumerable<CarDto>> Handle(GetCarSuggestionsByPhoneNumberQuery request, CancellationToken cancellationToken)
        {
            return await clientRepository
            .GetAll()
            .Where(c => c.PhoneNumber == request.PhoneNumber)
            .SelectMany(c => c.Repairs.Select(r => r.Car))
            .Distinct()
            .ProjectTo<CarDto>(_mapper.ConfigurationProvider)
            .ToListAsync(cancellationToken);
        }
    }
}
