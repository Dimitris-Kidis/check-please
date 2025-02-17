using Common.Pagination;
using MediatR;
using Queries.DTOs;

namespace Queries.Queries.Cars.GetCarSearchPaginated
{
    public class GetCarSearchPaginatedQuery : IRequest<PaginatorResult<CarDto>>
    {
        public string? SearchInput { get; set; }
        public PaginatorRequest PaginatedRequest { get; set; } = new();
    }
}
