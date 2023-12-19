using ApplicationCore.Services.Repository.CheckRepository;
using Command.Car.CreateCar;
using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Command.Car.UpdateCar
{
    public class UpdateCarMileageCommandValidator : AbstractValidator<UpdateCarMileageCommand>
    {
        //private readonly ICheckRepository<ApplicationCore.Domain.Entities.Car> _carsRepository;

        public UpdateCarMileageCommandValidator(
            //ICheckRepository<ApplicationCore.Domain.Entities.Car> carsRepository
        )
        {
            RuleFor(car => car.Mileage)
                .NotEmpty().WithMessage("Поле пробега обязательно.")
                .InclusiveBetween(10000, 2000000).WithMessage("Диапазон пробега может быть от 10.000 до 2.000.000 км.");

            //RuleFor(car => car.Mileage)
            //    .NotEmpty().WithMessage("Поле пробега обязательно.")
            //    .InclusiveBetween(10000, 2000000).WithMessage("Диапазон пробега может быть от 10.000 до 2.000.000 км.");
        }
    }
}
