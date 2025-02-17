using MediatR;
using Queries.DTOs;

namespace Queries.Queries.Repairs.GetRepair
{
    public class GetRepairQuery : IRequest<RepairDto>
    {
        public Guid Id { get; set; }
    }
}
