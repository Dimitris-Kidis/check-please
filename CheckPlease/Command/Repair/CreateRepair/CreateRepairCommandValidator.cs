using Command.Clients.CreateClient;
using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Command.Repair.CreateRepair
{
    public class CreateRepairCommandValidator : AbstractValidator<CreateRepairCommand>
    {
        public CreateRepairCommandValidator()
        {
            RuleFor(repair => repair.CarId)
                .NotEmpty()
                .WithMessage("Car id is obligatory!");

            RuleFor(repair => repair.ClientId)
                .NotEmpty()
                .WithMessage("Client id is obligatory!");

            RuleForEach(repair => repair.Details).SetValidator(new DetailValidator());
        }
    }

    public class DetailValidator : AbstractValidator<CreateDetail>
    {
        public DetailValidator()
        {
            RuleFor(detail => detail.DetailName)
                .MinimumLength(3)
                .MaximumLength(30)
                .WithMessage("Detail name must be between 3 and 30 symbols long.");
        }
    }
}
