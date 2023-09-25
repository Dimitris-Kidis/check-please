using FluentValidation;

namespace Command.Auth.Login
{
    public class LoginCommandValidator : AbstractValidator<LoginCommand>
    {
        public LoginCommandValidator()
        {
            RuleFor(user => user.Email)
                .NotEmpty()
                .EmailAddress()
                .MinimumLength(5)
                .MaximumLength(30);

            RuleFor(user => user.Password)
                .NotEmpty()
                .MinimumLength(8)
                .MaximumLength(20)
                .Matches("[A-Z]").WithMessage("'Password' must contain one or more capital letters.")
                .Matches("[a-z]").WithMessage("'Password' must contain one or more lowercase letters.")
                .Matches(@"\d").WithMessage("'Password' must contain one or more digits.")
                .Matches(@"[][""!@$%^&*(){}:;<>,.?/+_=|'~\\-]").WithMessage("'Password' must contain one or more special characters.");

        }
    }
}
