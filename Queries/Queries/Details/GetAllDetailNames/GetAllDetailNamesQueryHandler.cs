using Core.Domain.Entities;
using Core.Repositories.CheckPleaseRepository;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Queries.DTOs;

namespace Queries.Queries.Details.GetAllDetailNames
{
    public class GetAllDetailNamesQueryHandler(
        ICheckPleaseRepository<Detail> detailRepository
        ) : IRequestHandler<GetAllDetailNamesQuery, IEnumerable<DetailOptionDto>>
    {
        private readonly ICheckPleaseRepository<Detail> detailRepository = detailRepository;

        public async Task<IEnumerable<DetailOptionDto>> Handle(GetAllDetailNamesQuery request, CancellationToken cancellationToken)
        {
            var detailNames = await detailRepository
                .GetAll()
                .Where(x => !string.IsNullOrWhiteSpace(x.DetailName))
                .GroupBy(x => x.DetailName)
                .Select(g => new { DetailName = g.Key, Count = g.Count() })
                .OrderByDescending(x => x.Count)
                .Select(x => new DetailOptionDto { DetailName = x.DetailName })
                .ToListAsync(cancellationToken);

            return detailNames;
        }
    }
}
