using ApplicationCore.Domain.Entities;
using ApplicationCore.Services.Repository.CheckRepository;
using AutoMapper;
using MediatR;
using Query.Clients.GetClientHistory;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Query.Cars.FindCarsByCarSign
{
    public class FindCarsByCarSignQueryHandler : IRequestHandler<FindCarsByCarSignQuery, IEnumerable<FindCarsByCarSignDto>>
    {
        private readonly ICheckRepository<Car> _carsRepository;
        private readonly IMapper _mapper;

        public FindCarsByCarSignQueryHandler(
            ICheckRepository<Car> carsRepository,
            IMapper mapper)
        {
            _carsRepository = carsRepository;
            _mapper = mapper;
        }

        public async Task<IEnumerable<FindCarsByCarSignDto>> Handle(FindCarsByCarSignQuery request, CancellationToken cancellationToken)
        {
            var cars = _carsRepository
                .FindBy(car => car.CarSign.Contains(request.CarSign))
                .ToList();

            return cars.Select(_mapper.Map<FindCarsByCarSignDto>);
        }
    }
}
