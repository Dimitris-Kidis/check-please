using AutoMapper;
using AutoMapper.QueryableExtensions;
using Core.Domain.Entities;
using Core.Repositories.CheckPleaseRepository;
using Core.Services.EntityValidator;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Queries.DTOs;

namespace Queries.Queries.Clients.GetClient
{
    public class GetClientQueryHandler(
        ICheckPleaseRepository<Client> clientRepository,
        IEntityValidatorService<Client> clientValidator,
        IMapper mapper) : IRequestHandler<GetClientQuery, ClientDto>
    {
        private readonly ICheckPleaseRepository<Client> clientRepository = clientRepository;
        private readonly IEntityValidatorService<Client> clientValidator = clientValidator;
        private readonly IMapper _mapper = mapper;

        public async Task<ClientDto> Handle(GetClientQuery request, CancellationToken cancellationToken)
        {
            await clientValidator.EntityExistsAsync(request.Id, cancellationToken);

            return await clientRepository
                .GetAll()
                .Where(x => x.Id == request.Id)
                .ProjectTo<ClientDto>(_mapper.ConfigurationProvider)
                .SingleAsync(cancellationToken);
        }
    }
}
