using ApplicationCore.Domain.Entities;
using ApplicationCore.Services.Repository.CheckRepository;
using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Query.Clients.GetAllClients;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Query.Clients.GetClientHistory
{
    public class GetClientHistoryQueryHandler : IRequestHandler<GetClientHistoryQuery, IEnumerable<GetClientHistoryDto>>
    {
        private readonly ICheckRepository<Client> _clientsRepository;
        private readonly ICheckRepository<Car> _carsRepository;
        private readonly ICheckRepository<Repair> _repairsRepository;
        private readonly IMapper _mapper;

        public GetClientHistoryQueryHandler(
            ICheckRepository<Client> clientsRepository,
            ICheckRepository<Car> carsRepository,
            ICheckRepository<Repair> repairsRepository,
            IMapper mapper)
        {
            _clientsRepository = clientsRepository;
            _carsRepository = carsRepository;
            _repairsRepository = repairsRepository;
            _mapper = mapper;
        }

        public async Task<IEnumerable<GetClientHistoryDto>> Handle(GetClientHistoryQuery request, CancellationToken cancellationToken)
        {            
            var repairsInfo = await _repairsRepository
                .GetAll()
                .Include(repair => repair.Car)
                .Where(repair => repair.Car.CarSign == request.CarSign)
                .Select(repair => new GetClientHistoryDto
                {
                    Id = repair.Id,
                    CarSign = repair.Car.CarSign,
                    VinCode = repair.Car.VinCode,
                    Mileage = repair.Mileage,
                    Year = repair.Car.Year,
                    Volume = repair.Car.Volume,
                    Brand = repair.Car.Brand,
                    Model = repair.Car.Model,
                    RepairationDate = repair.CreatedAt,
                    Problems = repair.Problems,
                    Details = (ICollection<DetailInfo>)repair.Details.Select(detail => new DetailInfo
                    {
                        DetailName = detail.DetailName,
                        PricePerOne = detail.PricePerOne,
                        Quantity = detail.Quantity,
                        DetailsPrice = ((detail.PricePerOne ?? 0) * (detail.Quantity ?? 0)),
                        RepairPrice = detail.RepairPrice,
                        TotalPrice = ((detail.PricePerOne ?? 0) * (detail.Quantity ?? 0)) + detail.RepairPrice
                    })
                })
                .OrderByDescending(repair => repair.RepairationDate)
                .ToListAsync();


            return repairsInfo.Select(_mapper.Map<GetClientHistoryDto>);
        }
    }
}
