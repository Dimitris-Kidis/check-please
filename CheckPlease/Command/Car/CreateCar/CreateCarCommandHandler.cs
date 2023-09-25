using ApplicationCore.Services.Repository.CheckRepository;
using MediatR;
using ApplicationCore.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Command.Car.CreateCar
{
    public class CreateCarCommandHandler : IRequestHandler<CreateCarCommand, int>
    {
        private readonly ICheckRepository<ApplicationCore.Domain.Entities.Car> _carRepository;
        public CreateCarCommandHandler(ICheckRepository<ApplicationCore.Domain.Entities.Car> carRepository)
        {
            _carRepository = carRepository;
        }
        public Task<int> Handle(CreateCarCommand request, CancellationToken cancellationToken)
        {
            var newCarNew = new ApplicationCore.Domain.Entities.Car
            {
                CarSign = request.CarSign,
                VinCode = request.VinCode,
                Mileage = request.Mileage,
                Year = request.Year,
                Volume = request.Volume,
                Brand = request.Brand,
                Model = request.Model
            };

            _carRepository.Add(newCarNew);
            _carRepository.Save();

            var resultId = newCarNew.Id;
            return Task.FromResult(resultId);
        }
    }
}
