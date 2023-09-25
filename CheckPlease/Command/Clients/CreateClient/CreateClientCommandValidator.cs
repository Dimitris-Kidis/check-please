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
            var genderConditions = new List<string>() { "M", "F" };

            RuleFor(client => client.FullName)
                .MinimumLength(2)
                .MaximumLength(20)
                .WithMessage("Name must be between 2 and 20 symbols long.");

            RuleFor(client => client.PhoneNumber)
                .NotEmpty()
                .MinimumLength(5)
                .MaximumLength(15)
                .WithMessage("Phone number must be between 5 and 15 symbols long.");

            RuleFor(client => client.Email)
                .MinimumLength(5)
                .MaximumLength(20)
                .WithMessage("Email must be between 5 and 20 symbols long.");

            RuleFor(client => client.JobTitle)
                .MinimumLength(3)
                .MaximumLength(20)
                .WithMessage("Job title must be between 3 and 20 symbols long.");

            RuleFor(client => client.Age)
                .InclusiveBetween(18, 100)
                .WithMessage("Age must be between 18 and 100.");

            RuleFor(client => client.Gender)
                .Must(conditions =>
                    genderConditions.Contains(conditions))
                .WithMessage("Please only use: " + String.Join(", ", genderConditions))
                .When(client => !string.IsNullOrEmpty(client.Gender));
        }
    }
}
