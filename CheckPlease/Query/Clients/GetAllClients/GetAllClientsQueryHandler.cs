using ApplicationCore.Domain.Entities;
using ApplicationCore.Services.Repository.CheckRepository;
using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Query.Cars.GetAllCars;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Query.Clients.GetAllClients
{
    public class GetAllClientsQueryHandler : IRequestHandler<GetAllClientsQuery, IEnumerable<GetAllClientsDto>>
    {
        private readonly ICheckRepository<Client> _clientsRepository;
        private readonly ICheckRepository<Car> _carsRepository;
        private readonly ICheckRepository<Repair> _repairsRepository;
        private readonly IMapper _mapper;

        public GetAllClientsQueryHandler(
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

        public async Task<IEnumerable<GetAllClientsDto>> Handle(GetAllClientsQuery request, CancellationToken cancellationToken)
        {
            var repairs = _repairsRepository.GetAll();
            var clients = _clientsRepository.GetAll();

            var clientsInfo =
                _clientsRepository
                .GetAll()
                .Include(client => client.Repairs)
                .Select(client => new GetAllClientsDto
                {
                    FullName = client.FullName,
                    PhoneNumber = client.PhoneNumber,
                    Age = client.Age,
                    Gender = client.Gender,
                    JobTitle = client.JobTitle,
                    Email = client.Email,
                    CarsCount = client.Repairs.Count(),
                })
                .Distinct()
                .ToList();

            return clientsInfo.Select(_mapper.Map<GetAllClientsDto>);
        }
    }
}
