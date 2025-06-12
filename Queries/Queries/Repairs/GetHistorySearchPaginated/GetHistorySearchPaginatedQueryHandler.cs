using AutoMapper;
using AutoMapper.QueryableExtensions;
using Common.Pagination;
using Core.Domain.Entities;
using Core.Repositories.CheckPleaseRepository;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Queries.DTOs;

namespace Queries.Queries.Repairs.GetHistorySearchPaginated
{
    public class GetHistorySearchPaginatedQueryHandler(
        ICheckPleaseRepository<Repair> repairRepository,
        IMapper mapper) : IRequestHandler<GetHistorySearchPaginatedQuery, PaginatorResult<RepairDto>>
    {
        private readonly ICheckPleaseRepository<Repair> repairRepository = repairRepository;
        private readonly IMapper _mapper = mapper;

        public async Task<PaginatorResult<RepairDto>> Handle(GetHistorySearchPaginatedQuery request, CancellationToken cancellationToken)
        {
            var query = repairRepository.GetAll()
                .Include(r => r.Car)
                .Include(r => r.Client)
                .AsQueryable();

            if (!string.IsNullOrWhiteSpace(request.SearchInput))
            {
                string search = request.SearchInput.Trim().ToLower();

                query = query.Where(r =>
                    (r.AdditionalNotes != null && r.AdditionalNotes.ToLower().Contains(search)) ||
                    (r.Car.CarSign != null && r.Car.CarSign.ToLower().Contains(search)) ||
                    (r.Car.VinCode != null && r.Car.VinCode.ToLower().Contains(search)) ||
                    (r.Car.Brand != null && r.Car.Brand.ToLower().Contains(search)) ||
                    (r.Car.Model != null && r.Car.Model.ToLower().Contains(search)) ||
                    (r.Car.AdditionalNotes != null && r.Car.AdditionalNotes.ToLower().Contains(search)) ||
                    (r.Client.FullName != null && r.Client.FullName.ToLower().Contains(search)) ||
                    (r.Client.PhoneNumber != null && r.Client.PhoneNumber.ToLower().Contains(search)) ||
                    (r.Client.AdditionalNotes != null && r.Client.AdditionalNotes.Contains(search))
                );
            }

            if (request.Date.HasValue)
            {
                DateTimeOffset date = request.Date.Value.Date;
                query = query.Where(r => r.RepairDate.HasValue && r.RepairDate.Value.Date == date.Date);
            }

            int total = await query.CountAsync(cancellationToken);

            bool hasMore = (request.PaginatedRequest.PageIndex) * request.PaginatedRequest.PageSize < total;

            var repairs = await query
                .OrderByDescending(r => r.CreatedAt)
                .ThenByDescending(r => r.RepairDate)
                .Skip((request.PaginatedRequest.PageIndex - 1) * request.PaginatedRequest.PageSize)
                .Take(request.PaginatedRequest.PageSize)
                .ProjectTo<RepairDto>(_mapper.ConfigurationProvider)
                .ToListAsync(cancellationToken);

            return new PaginatorResult<RepairDto>
            {
                Items = repairs,
                Total = total,
                HasMore = hasMore
            };
        }
    }
}
