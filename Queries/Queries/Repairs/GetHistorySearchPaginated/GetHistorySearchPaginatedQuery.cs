using Common.Pagination;
using MediatR;
using Queries.DTOs;

namespace Queries.Queries.Repairs.GetHistorySearchPaginated
{
    public class GetHistorySearchPaginatedQuery : IRequest<PaginatorResult<RepairDto>>
    {
        public DateTimeOffset? Date { get; set; }
        public string? SearchInput { get; set; }
        public PaginatorRequest PaginatedRequest { get; set; } = new();
    }
}
