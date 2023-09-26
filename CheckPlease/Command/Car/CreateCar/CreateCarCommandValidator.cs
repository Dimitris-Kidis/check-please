using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Command.Car.CreateCar
{
    public class CreateCarCommandValidator : AbstractValidator<CreateCarCommand>
    {
        public CreateCarCommandValidator()
        {
            RuleFor(car => car.CarSign)
                .NotEmpty()
                .MinimumLength(3)
                .MaximumLength(8)
                .WithMessage("Car Sign must be between 3 and 8 symbols long.");

            RuleFor(car => car.VinCode)
                .MinimumLength(10)
                .MaximumLength(20)
                .WithMessage("Vin Code must be between 10 and 20 symbols long.");

            RuleFor(car => car.Mileage)
                .InclusiveBetween(10000, 1000000)
                .WithMessage("Mileage must be between 10.000 and 1.000.000.");

            RuleFor(car => car.Year)
                .InclusiveBetween(1950, 2040)
                .WithMessage("Year must be between 1950 and 2040.");

            RuleFor(car => car.Volume)
                .MinimumLength(3)
                .MaximumLength(3)
                .WithMessage("Engine volume must be between 3 characters long."); ;
        }
    }
}
