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
                .NotEmpty().WithMessage("Поле с номером машины обязательно.")
                .MinimumLength(3).WithMessage("Минимальная длина номеров - три символа.")
                .MaximumLength(8).WithMessage("Максимальная длина номеров - восемь символа.");

            RuleFor(car => car.VinCode)
                //.NotEmpty().WithMessage("Поле вин-кода не может быть пустым.")
                .Length(17).WithMessage((value) => $"Вин-код должен быть ровно 17 символов в длину. Вы ввели {value.VinCode.Length}");

            RuleFor(car => car.Mileage)
                .NotEmpty().WithMessage("Поле пробега обязательно.")
                .InclusiveBetween(10000, 1000000).WithMessage("Диапазон пробега может быть от 10.000 до 1.000.000 км.");

            RuleFor(car => car.Year)
                .InclusiveBetween(1950, 2040)
                .WithMessage("Год машины может быть в диапазоне от 1950 до 2040.");

            RuleFor(car => car.Volume)
                .MinimumLength(2).WithMessage("Минимальная длина объема двигателя - 2 символа.")
                .MaximumLength(6).WithMessage("Максимальная длина объема двигателя - 6 символов.");
        }
    }
}
