using MediatR;

namespace Command.Auth.Login;

public class LoginCommand : IRequest
{
    public string Email { get; set; }
    public string Password { get; set; }
}
