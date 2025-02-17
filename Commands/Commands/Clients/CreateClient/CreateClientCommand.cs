using MediatR;

namespace Commands.Commands.Clients.CreateClient
{
    public class CreateClientCommand : IRequest<Guid>
    {
        public string? FullName { get; set; }
        public string PhoneNumber { get; set; } = null!;
        public string? AdditionalNotes { get; set; }
    }
}
