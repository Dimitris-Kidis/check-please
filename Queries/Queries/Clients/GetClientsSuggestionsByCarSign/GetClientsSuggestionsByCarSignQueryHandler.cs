using AutoMapper;
using AutoMapper.QueryableExtensions;
using Core.Domain.Entities;
using Core.Repositories.CheckPleaseRepository;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Queries.DTOs;

namespace Queries.Queries.Clients.GetClientsSuggestionsByCarSign
{
    public class GetClientsSuggestionsByCarSignQueryHandler(
        ICheckPleaseRepository<Car> carRepository,
        ICheckPleaseRepository<Client> clientRepository,
        IMapper mapper) : IRequestHandler<GetClientsSuggestionsByCarSignQuery, IEnumerable<ClientDto>>
    {
        private readonly ICheckPleaseRepository<Car> carRepository = carRepository;
        private readonly ICheckPleaseRepository<Client> clientRepository = clientRepository;
        private readonly IMapper _mapper = mapper;

        public async Task<IEnumerable<ClientDto>> Handle(GetClientsSuggestionsByCarSignQuery request, CancellationToken cancellationToken)
        {
            return await carRepository
            .GetAll()
            .Where(c => c.CarSign == request.CarSign)
            .SelectMany(c => c.Repairs.Select(r => r.Client))
            .Distinct()
            .ProjectTo<ClientDto>(_mapper.ConfigurationProvider)
            .ToListAsync(cancellationToken);
        }
    }
}
