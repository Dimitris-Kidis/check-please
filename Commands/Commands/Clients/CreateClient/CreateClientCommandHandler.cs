using AutoMapper;
using Common.Exceptions;
using Core.Domain.Entities;
using Core.Repositories.CheckPleaseRepository;
using MediatR;

namespace Commands.Commands.Clients.CreateClient
{

    public class CreateClientCommandHandler(
        ICheckPleaseRepository<Client> clientRepository,
        IMapper mapper
    ) : IRequestHandler<CreateClientCommand, Guid>
    {
        private readonly ICheckPleaseRepository<Client> clientRepository = clientRepository;
        private readonly IMapper _mapper = mapper;

        public async Task<Guid> Handle(CreateClientCommand request, CancellationToken cancellationToken)
        {
            var isExistingNumber = clientRepository.GetAll().Where(x => x.PhoneNumber == request.PhoneNumber).Any();

            if (isExistingNumber)
            {
                throw new BusinessValidationException("Client with such number already exists");
            }

            var client = _mapper.Map<Client>(request);

            await clientRepository.AddAsync(client, cancellationToken);

            return client.Id;
        }
    }
}
