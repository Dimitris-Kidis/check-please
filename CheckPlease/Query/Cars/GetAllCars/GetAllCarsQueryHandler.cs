using ApplicationCore.Domain.Entities;
using ApplicationCore.Services.Repository.CheckRepository;
using AutoMapper;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using System.Xml.Linq;

namespace Query.Cars.GetAllCars
{
    public class GetAllCarsQueryHandler : IRequestHandler<GetAllCarsQuery, IEnumerable<GetAllCarsDto>>
    {
        private readonly ICheckRepository<Client> _clientsRepository;
        private readonly ICheckRepository<Car> _carsRepository;
        private readonly ICheckRepository<Repair> _repairsRepository;
        private readonly IMapper _mapper;

        public GetAllCarsQueryHandler(
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

        public async Task<IEnumerable<GetAllCarsDto>> Handle(GetAllCarsQuery request, CancellationToken cancellationToken)
        {
            var cars = _carsRepository.GetAll();
            var repairs = _repairsRepository.GetAll();
            var clients = _clientsRepository.GetAll();

            var carsInfo =
                 (from repair in repairs
                  join car in cars on repair.CarId equals car.Id
                  join client in clients on repair.ClientId equals client.Id
                  select new GetAllCarsDto
                  {
                      ClientsName = client.FullName,
                      OwnersPhoneNumber = client.PhoneNumber,
                      CarSign = car.CarSign,
                      VinCode = car.VinCode,
                      Year = car.Year,
                      Mileage = car.Mileage,
                      Model = car.Model,
                      Volume = car.Volume,
                      Brand = car.Brand
                  }).ToList();

            return carsInfo.Select(_mapper.Map<GetAllCarsDto>);
        }
    }
}
