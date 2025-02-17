using MediatR;

namespace Commands.Commands.Repairs.DeleteRepair
{
    public class DeleteRepairCommand : IRequest
    {
        public Guid Id { get; set; }
    }
}
