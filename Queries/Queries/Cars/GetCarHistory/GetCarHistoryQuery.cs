using MediatR;
using Queries.DTOs;

namespace Queries.Queries.Cars.GetCarHistory
{
    public class GetCarHistoryQuery : IRequest<IEnumerable<RepairDto>>
    {
        public Guid Id { get; set; }
    }
}
