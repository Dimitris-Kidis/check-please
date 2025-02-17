using AutoMapper;
using Core.Domain.Entities;
using Core.Repositories.CheckPleaseRepository;
using Core.Services.EntityValidator;
using MediatR;

namespace Commands.Commands.Clients.UpdateClient
{
    public class UpdateClientCommandHandler(
        ICheckPleaseRepository<Client> clientRepository,
        IEntityValidatorService<Client> clientValidator,
        IMapper mapper
    ) : IRequestHandler<UpdateClientCommand>
    {
        private readonly ICheckPleaseRepository<Client> clientRepository = clientRepository;
        private readonly IEntityValidatorService<Client> clientValidator = clientValidator;
        private readonly IMapper _mapper = mapper;

        public async Task Handle(UpdateClientCommand request, CancellationToken cancellationToken)
        {
            await clientValidator.EntityExistsAsync(request.Id, cancellationToken);
            var calendarEvent = await clientRepository.GetByIdAsync(request.Id, cancellationToken);
            _mapper.Map(request, calendarEvent);
            await clientRepository.UpdateAsync(calendarEvent, cancellationToken);
        }
    }
}
