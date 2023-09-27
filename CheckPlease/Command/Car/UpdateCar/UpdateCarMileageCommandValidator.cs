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
        public UpdateCarMileageCommandValidator()
        {
            RuleFor(car => car.Mileage)
                .NotEmpty().WithMessage("Поле пробега обязательно.")
                .InclusiveBetween(10000, 1000000).WithMessage("Диапазон пробега может быть от 10.000 до 1.000.000 км.");
        }
    }
}
