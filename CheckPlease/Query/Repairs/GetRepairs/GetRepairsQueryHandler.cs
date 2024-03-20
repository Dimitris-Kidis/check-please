using ApplicationCore.Domain.Entities;
using ApplicationCore.Services.Repository.CheckRepository;
using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Query.Clients.GetClientHistory;

using AutoMapper.QueryableExtensions;
using System.Linq.Expressions;
using System.Linq;

namespace Query.Repairs.GetRepairs
{
    public class GetRepairsQueryHandler : IRequestHandler<GetRepairsQuery, IEnumerable<GetRepairsDto>>
    {
        private readonly ICheckRepository<Car> _carsRepository;
        private readonly ICheckRepository<Detail> _detailsRepository;
        private readonly ICheckRepository<Repair> _repairsRepository;
        private readonly IMapper _mapper;

        public GetRepairsQueryHandler(
            ICheckRepository<Car> carsRepository,
            ICheckRepository<Detail> detailsRepository,
            ICheckRepository<Repair> repairsRepository,
            IMapper mapper)
        {
            _carsRepository = carsRepository;
            _detailsRepository = detailsRepository;
            _repairsRepository = repairsRepository;
            _mapper = mapper;
        }

        public async Task<IEnumerable<GetRepairsDto>> Handle(GetRepairsQuery request, CancellationToken cancellationToken)
        {
            var today = DateTimeOffset.Now.Date;
            var yesterday = DateTimeOffset.Now.Date.AddDays(-1);

            var tempList = new List<GetRepairsDto?>();
            var resultList = new List<GetRepairsDto?>();

            var carsList = await _repairsRepository
                .GetAll()
                .Where(r => r.Car.CarSign.Contains(request.CarSign.ToUpper()))
                .ProjectTo<GetRepairsDto?>(_mapper.ConfigurationProvider)
                .ToListAsync(cancellationToken);

            if (request.IsToday.HasValue && request.IsToday.Value)
            {
                tempList = carsList.Where(x => !request.IsToday.Value || x.Date.Date == today).ToList();
                if (tempList.Count > 0) resultList = resultList.Concat(tempList).ToList();
            }

            if (request.IsYesterday.HasValue && request.IsYesterday.Value)
            {
                tempList = carsList.Where(x => !request.IsYesterday.Value || x.Date.Date == yesterday).ToList();
                if (tempList.Count > 0) resultList = resultList.Concat(tempList).ToList();
            }

            if (request.Date != null && (request.Date.Value.Date != today || request.Date.Value.Date != yesterday))
            {
                tempList = carsList.Where(x => !request.Date.HasValue || x.Date.Date == request.Date.Value.Date).ToList();
                if (tempList.Count > 0) resultList = resultList.Concat(tempList).ToList();
            }

            return (resultList.Count > 0 ? resultList : carsList)
                .DistinctBy(x => x.Id)
                .OrderByDescending(x => x.Date)
                .Select(_mapper.Map<GetRepairsDto>);
        }
    }
}
