using ApplicationCore.Domain.Entities;
using ApplicationCore.Services.Repository.CheckRepository;
using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Query.Cars.FindCarsByCarSign;
using Query.Cars.GetAllCars;
using Query.Clients.GetClientHistory;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.ConstrainedExecution;
using System.Text;
using System.Threading.Tasks;

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

            var cars = _carsRepository.GetAll();
            var repairs = _repairsRepository.GetAll();
            var details = _detailsRepository.GetAll();

            //var car2 = _carsRepository
            //    .GetAll()
            //    .Include(x => x.Repairs).ThenInclude(detai => detai.Details)
            //.Where(car => car.CarSign.Contains(request.CarSign))
            //.Where(car => !request.IsToday && car.CreatedAt.Date == today)
            //.Where(car => !request.IsYesterday && car.CreatedAt.Date == yesterday)
            //.Where(car => request.Date.Date != default(DateTimeOffset) && car.CreatedAt.Date == request.Date.Date)
            //    .Select(x => new GetRepairsDto
            //    {
            //          Id = x.Repairs.Id,
            //          Date = repair.CreatedAt,
            //          CarSign = car.CarSign,
            //          Mileage = car.Mileage,
            //          Details = (IEnumerable<Detail>)repair.Details.Select(detail => new DetailInfo
            //          {
            //              DetailName = detail.DetailName,
            //              PricePerOne = detail.PricePerOne,
            //              Quantity = detail.Quantity,
            //              DetailsPrice = ((detail.PricePerOne ?? 0) * (detail.Quantity ?? 0)),
            //              RepairPrice = detail.RepairPrice,
            //              TotalPrice = ((detail.PricePerOne ?? 0) * (detail.Quantity ?? 0)) + detail.RepairPrice
            //          })
            //    })
            //    .ToList();

            var l = request.IsToday.Value;

            var carsInfuo = 
                cars
                .Where(car => car.CarSign.Contains(request.CarSign))
                .Where(car => !request.IsToday.Value || car.CreatedAt.Date == today)
                .ToList();

            var carsInfo = await
                 (from repair in repairs
                  join car in cars on repair.CarId equals car.Id
                  where car.CarSign.Contains(request.CarSign)
                  where !request.IsToday.Value || repair.CreatedAt.Date == today
                  where !request.IsYesterday.Value || repair.CreatedAt.Date == yesterday
                  where request.Date == null || repair.CreatedAt.Date == request.Date.Value.Date
                  select new GetRepairsDto
                  {
                      Id = repair.Id,
                      Date = repair.CreatedAt,
                      CarSign = car.CarSign,
                      Mileage = car.Mileage,
                      Details = repair.Details.Select(detail => new DetailInfo
                      {
                          DetailName = detail.DetailName,
                          PricePerOne = detail.PricePerOne,
                          Quantity = detail.Quantity,
                          DetailsPrice = detail.DetailsPrice,
                          RepairPrice = detail.RepairPrice,
                          TotalPrice = detail.TotalPrice
                      })
                  })
                  .OrderByDescending(repair => repair.Date)
                  .ToListAsync(cancellationToken);

            return carsInfo.Select(_mapper.Map<GetRepairsDto>);
        }
    }
}
