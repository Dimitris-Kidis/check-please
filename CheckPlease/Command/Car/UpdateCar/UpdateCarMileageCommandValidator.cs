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
                .InclusiveBetween(10000, 1000000)
                .WithMessage("Mileage must be between 10.000 and 1.000.000.");
        }
    }
}
