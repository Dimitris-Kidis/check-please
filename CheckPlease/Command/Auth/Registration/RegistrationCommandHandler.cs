using ApplicationCore.Domain.Entities;
using ApplicationCore.Services.Repository.UserRepository;
using MediatR;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Command.Auth.Registration
{
    public class RegistrationCommandHandler : IRequestHandler<RegistrationCommand, int>
    {
        private readonly UserManager<User> _userManager;
        private IUserRepository<User> _userRepository;
        public RegistrationCommandHandler(
            UserManager<User> userManager,
            IUserRepository<User> userRepository
            )
        {
            _userRepository = userRepository;
            _userManager = userManager;
        }
        public async Task<int> Handle(RegistrationCommand command, CancellationToken cancellationToken)
        {
            if (_userRepository.GetAll().Count() >= 1) return await Task.FromResult(0);

            User user = new User
            {
                Email = command.Email,
                Password = command.Password,
                UserName = command.Email,
                CreatedAt = DateTimeOffset.Now,
                CreatedBy = command.Email
            };

            var result = await _userManager.CreateAsync(user, command.Password);

            if (!result.Succeeded)
            {
                var errors = result.Errors.Select(e => e.Description);

                return await Task.FromResult(-1);
            }

            var resultId = user.Id;

            return await Task.FromResult(resultId);
        }
    }
}
