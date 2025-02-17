using AutoMapper;
using AutoMapper.QueryableExtensions;
using Common.Pagination;
using Core.Domain.Entities;
using Core.Repositories.CheckPleaseRepository;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Queries.DTOs;

namespace Queries.Queries.Clients.GetClientSearchPaginated
{
    public class GetClientSearchPaginatedQueryHandler(
        ICheckPleaseRepository<Client> clientRepository,
        IMapper mapper) : IRequestHandler<GetClientSearchPaginatedQuery, PaginatorResult<ClientDto>>
    {
        private readonly ICheckPleaseRepository<Client> clientRepository = clientRepository;
        private readonly IMapper _mapper = mapper;

        public async Task<PaginatorResult<ClientDto>> Handle(GetClientSearchPaginatedQuery request, CancellationToken cancellationToken)
        {
            var query = clientRepository.GetAll();

            if (!string.IsNullOrWhiteSpace(request.SearchInput))
            {
                string search = request.SearchInput.Trim().ToLower();
                query = query.Where(u =>
                    u.PhoneNumber.ToLower().Contains(search) ||
                    u.FullName.ToLower().Contains(search) ||
                    u.AdditionalNotes.ToLower().Contains(search));
            }

            int total = await query.CountAsync(cancellationToken);

            bool hasMore = (request.PaginatedRequest.PageIndex + 1) * request.PaginatedRequest.PageSize < total;

            var clients = await query
                .OrderBy(u => u.Id)
                .Skip((request.PaginatedRequest.PageIndex - 1) * request.PaginatedRequest.PageSize)
                .Take(request.PaginatedRequest.PageSize)
                .ProjectTo<ClientDto>(_mapper.ConfigurationProvider)
                .ToListAsync(cancellationToken);

            return new PaginatorResult<ClientDto>
            {
                Items = clients,
                Total = total,
                HasMore = hasMore
            };
        }
    }
}
