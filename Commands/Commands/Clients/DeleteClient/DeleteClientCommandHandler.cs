using Core.Domain.Entities;
using Core.Repositories.CheckPleaseRepository;
using Core.Services.EntityValidator;
using MediatR;

namespace Commands.Commands.Clients.DeleteClient
{
    public class DeleteClientCommandHandler(
        ICheckPleaseRepository<Client> clientRepository,
        IEntityValidatorService<Client> clientValidator
    ) : IRequestHandler<DeleteClientCommand>
    {
        private readonly ICheckPleaseRepository<Client> clientRepository = clientRepository;
        private readonly IEntityValidatorService<Client> clientValidator = clientValidator;

        public async Task Handle(DeleteClientCommand request, CancellationToken cancellationToken)
        {
            await clientValidator.EntityExistsAsync(request.Id, cancellationToken);
            Client client = await clientRepository.GetByIdAsync(request.Id, cancellationToken);
            await clientRepository.DeleteAsync(client, cancellationToken);
        }
    }
}
