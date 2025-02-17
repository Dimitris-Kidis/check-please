using MediatR;

namespace Commands.Commands.Clients.DeleteClient
{
    public class DeleteClientCommand : IRequest
    {
        public Guid Id { get; set; }
    }
}
