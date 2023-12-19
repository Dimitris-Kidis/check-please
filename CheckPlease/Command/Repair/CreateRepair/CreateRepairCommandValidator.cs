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

            RuleForEach(repair => repair.Details)
                .SetValidator(new DetailValidator()).NotEmpty().WithMessage("Детали нужно указать обязательно.");
        }
    }

    public class DetailValidator : AbstractValidator<CreateDetail>
    {
        public DetailValidator()
        {
            RuleFor(detail => detail.DetailName)
                .NotEmpty().WithMessage("Название детали обязательно.")
                .MinimumLength(3).WithMessage("Название детали должно содержать минимум 3 символа.")
                .MaximumLength(40).WithMessage("Название детали может содержать максимум 40 символов.");

            RuleFor(detail => detail.PricePerOne)
                .NotEmpty().WithMessage("Укажите стоимость запчасти/услуги за одну шт.")
                .GreaterThanOrEqualTo(0).WithMessage("Цена запчасти должна быть больше или равна нулю.");

            RuleFor(detail => detail.Quantity)
                .NotEmpty().WithMessage("Укажите количество запчастей/услуг.")
                .GreaterThanOrEqualTo(0).WithMessage("Количество должно быть больше нуля.");

            RuleFor(detail => detail.RepairPrice)
                .GreaterThanOrEqualTo(0).WithMessage("Цена работы должна быть больше или равна нулю.");
        }
    }
}
