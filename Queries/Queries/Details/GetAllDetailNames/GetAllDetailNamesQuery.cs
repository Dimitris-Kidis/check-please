using MediatR;
using Queries.DTOs;

namespace Queries.Queries.Details.GetAllDetailNames
{
    public class GetAllDetailNamesQuery : IRequest<IEnumerable<DetailOptionDto>> { }
}
