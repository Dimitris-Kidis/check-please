using Common.Pagination;
using MediatR;
using Queries.DTOs;

namespace Queries.Queries.Clients.GetClientSearchPaginated
{
    public class GetClientSearchPaginatedQuery : IRequest<PaginatorResult<ClientDto>>
    {
        public string? SearchInput { get; set; }
        public PaginatorRequest PaginatedRequest { get; set; } = new();
    }
}
