using MediatR;

namespace Commands.Commands.Clients.UpdateClient
{
    public class UpdateClientCommand : IRequest
    {
        public Guid Id { get; set; }
        public string? FullName { get; set; }
        public string PhoneNumber { get; set; } = null!;
        public string? AdditionalNotes { get; set; }
    }
}
