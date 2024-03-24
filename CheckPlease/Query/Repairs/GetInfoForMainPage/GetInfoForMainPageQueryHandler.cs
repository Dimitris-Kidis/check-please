using ApplicationCore.Domain.Entities;
using ApplicationCore.Services.Repository.CheckRepository;
using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Query.Repairs.GetRepairs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Query.Repairs.GetInfoForMainPage
{
    public class GetInfoForMainPageQueryHandler : IRequestHandler<GetInfoForMainPageQuery, GetInfoForMainPageDto>
    {
        private readonly ICheckRepository<Car> _carsRepository;
        private readonly ICheckRepository<Detail> _detailsRepository;
        private readonly ICheckRepository<Repair> _repairsRepository;
        private readonly IMapper _mapper;

        public GetInfoForMainPageQueryHandler(
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

        public async Task<GetInfoForMainPageDto> Handle(GetInfoForMainPageQuery request, CancellationToken cancellationToken)
        {
            var info = _repairsRepository
                .GetAll()
                .Include(x => x.Car)
                .Where(x => x.CreatedAt.Date == request.Date.Date)
                .ToList()
                .DistinctBy(x => x.CarId)
                .OrderBy(x => x.CreatedAt);

            var carList = info.Select(x => new CarItemDto
            {
                RepairId = x.Id,
                CarSign = x.Car.CarSign,
            })
            .ToList();

            GetInfoForMainPageDto data = new GetInfoForMainPageDto
            {
                TodayCarsNumber = info.Count(),
                MasterIncome = info.Sum(x => x.TotalRepairPrice),
                AssistantIncome = info.Sum(x => x.TotalRepairPrice <= 300 ? 20 : 50),
                CarList = carList
            };

            return data;
        }
    }
}
