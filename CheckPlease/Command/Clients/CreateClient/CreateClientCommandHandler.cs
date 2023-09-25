using ApplicationCore.Services.Repository.CheckRepository;
using Command.Car.CreateCar;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Command.Clients.CreateClient
{
    public class CreateClientCommandHandler : IRequestHandler<CreateClientCommand, int>
    {
        private readonly ICheckRepository<ApplicationCore.Domain.Entities.Client> _clientRepository;
        public CreateClientCommandHandler(ICheckRepository<ApplicationCore.Domain.Entities.Client> clientRepository)
        {
            _clientRepository = clientRepository;
        }
        public Task<int> Handle(CreateClientCommand request, CancellationToken cancellationToken)
        {
            var newClient = new ApplicationCore.Domain.Entities.Client
            {
                FullName = request.FullName,
                PhoneNumber= request.PhoneNumber,
                Email= request.Email,
                JobTitle= request.JobTitle,
                Age= request.Age,
                Gender= request.Gender
            };

            _clientRepository.Add(newClient);
            _clientRepository.Save();

            var resultId = newClient.Id;
            return Task.FromResult(resultId);
        }
    }
}
