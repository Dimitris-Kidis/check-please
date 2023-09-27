using Command.Car.CreateCar;
using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Command.Clients.CreateClient
{
    public class CreateClientCommandValidator : AbstractValidator<CreateClientCommand>
    {
        public CreateClientCommandValidator()
        {
            RuleFor(client => client.FullName)
                .NotEmpty().WithMessage("Поле имени не может быть пустым.")
                .MinimumLength(2).WithMessage("Имя должно быть минимум 2 символа.")
                .MaximumLength(25).WithMessage("Имя должно быть максимум 25 в длину.");

            RuleFor(client => client.PhoneNumber)
                .NotEmpty().WithMessage("Поле номера телефона не может быть пустым.")
                .MinimumLength(5).WithMessage("Номер телефона начинается от пяти символов.")
                .MaximumLength(15).WithMessage("Номер телефона не может быть длиннее пятнадцати символов");
        }
    }
}
