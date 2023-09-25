using ApplicationCore.Domain.Entities;
using ApplicationCore.Services.Repository.CheckRepository;
using ApplicationCore.Services.Repository.UserRepository;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Command.Car.UpdateCar
{
    public class UpdateCarMileageCommandHandler : IRequestHandler<UpdateCarMileageCommand, int>
    {
        private readonly ICheckRepository<ApplicationCore.Domain.Entities.Car> _carsRepository;
        public UpdateCarMileageCommandHandler(ICheckRepository<ApplicationCore.Domain.Entities.Car> carsRepository)
        {
            _carsRepository = carsRepository;
        }
        public Task<int> Handle(UpdateCarMileageCommand request, CancellationToken cancellationToken)
        {
            var car = _carsRepository.FindBy(carUpdate => carUpdate.Id == request.CarId).FirstOrDefault();
            if (car != null)
            {
                car.Mileage = request.Mileage;

                _carsRepository.Update(car);
                _carsRepository.Save();
            }
            else
            {
                return Task.FromResult(-1);
            }

            return Task.FromResult(0);
        }
    }
}
