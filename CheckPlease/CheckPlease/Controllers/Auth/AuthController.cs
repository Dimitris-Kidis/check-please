using ApplicationCore.Domain.Entities;
using AutoMapper;
using CheckPlease.Identity;
using Command.Auth.Login;
using Command.Auth.Registration;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

namespace CheckPlease.Controllers.Auth
{
    [Route("api/auth")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly IMediator _mediator;
        private readonly UserManager<User> _userManager;
        private readonly SignInManager<User> _signInManager;
        public AuthController(
            IMapper mapper,
            IMediator mediator,
            UserManager<User> userManager,
            SignInManager<User> signInManager)
        {
            _mapper = mapper;
            _mediator = mediator;
            _userManager = userManager;
            _signInManager = signInManager;
        }


        [HttpPost("registration")]
        public async Task<IActionResult> RegisterUser([FromBody] RegistrationCommand command)
        {
            if (command == null || !ModelState.IsValid) return BadRequest();
            var result = await _mediator.Send(command);
            if (result == 0) return BadRequest("You're not allowed to be here!");
            if (result == -1) return BadRequest("An error occured...");
            return Ok(result);
        }


        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginCommand command)
        {
            var user = await _userManager.FindByNameAsync(command.Email);
            if (user == null || !await _userManager.CheckPasswordAsync(user, command.Password))
                return Unauthorized(new AuthResponseDto { ErrorMessage = "Invalid Authentication" });


            var signinCredentials = new SigningCredentials(AuthOptions.GetSymmetricSecurityKey(), SecurityAlgorithms.HmacSha256);
            var jwtSecurityToken = new JwtSecurityToken(
                 issuer: AuthOptions.ISSUER,
                 audience: AuthOptions.AUDIENCE,
                 claims: new List<Claim>()
                 {
                     new Claim("username", user.Email),
                     new Claim("id", user.Id.ToString()),
                 },
                 expires: DateTime.Now.AddDays(30),
                 signingCredentials: signinCredentials
            );
            var tokenHandler = new JwtSecurityTokenHandler();

            var encodedToken = tokenHandler.WriteToken(jwtSecurityToken);
            return Ok(new AuthResponseDto { IsAuthSuccessful = true, Token = encodedToken });
        }

        [HttpPost]
        [Route("logout")]
        public async Task Logout()
        {
            await _signInManager.SignOutAsync();
        }
    }
}
