using AutoMapper;
using AutoMapper.QueryableExtensions;
using Common.Pagination;
using Core.Domain.Entities;
using Core.Repositories.CheckPleaseRepository;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Queries.DTOs;

namespace Queries.Queries.Cars.GetCarSearchPaginated
{
    public class GetCarSearchPaginatedQueryHandler(
    ICheckPleaseRepository<Car> carRepository,
    IMapper mapper) : IRequestHandler<GetCarSearchPaginatedQuery, PaginatorResult<CarDto>>
    {
        private readonly ICheckPleaseRepository<Car> carRepository = carRepository;
        private readonly IMapper _mapper = mapper;

        public async Task<PaginatorResult<CarDto>> Handle(GetCarSearchPaginatedQuery request, CancellationToken cancellationToken)
        {
            var query = carRepository.GetAll();

            if (!string.IsNullOrWhiteSpace(request.SearchInput))
            {
                string search = request.SearchInput.Trim().ToLower();
                query = query.Where(u =>
                    u.CarSign.ToLower().Contains(search) ||
                    u.VinCode.ToLower().Contains(search) ||
                    u.Volume.ToLower().Contains(search) ||
                    u.Brand.ToLower().Contains(search) ||
                    u.Model.ToLower().Contains(search) ||
                    u.AdditionalNotes.ToLower().Contains(search));
            }

            int total = await query.CountAsync(cancellationToken);

            bool hasMore = (request.PaginatedRequest.PageIndex + 1) * request.PaginatedRequest.PageSize < total;

            var car = await query
                .OrderBy(u => u.Id)
                .Skip((request.PaginatedRequest.PageIndex - 1) * request.PaginatedRequest.PageSize)
                .Take(request.PaginatedRequest.PageSize)
                .ProjectTo<CarDto>(_mapper.ConfigurationProvider)
                .ToListAsync(cancellationToken);

            return new PaginatorResult<CarDto>
            {
                Items = car,
                Total = total,
                HasMore = hasMore
            };
        }
    }
}