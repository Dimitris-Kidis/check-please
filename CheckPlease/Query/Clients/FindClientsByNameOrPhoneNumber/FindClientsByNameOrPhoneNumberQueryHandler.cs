using ApplicationCore.Domain.Entities;
using ApplicationCore.Services.Repository.CheckRepository;
using AutoMapper;
using MediatR;
using Query.Cars.FindCarsByCarSign;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Query.Clients.FindClientsByNameOrPhoneNumber
{
    public class FindClientsByNameOrPhoneNumberQueryHandler : IRequestHandler<FindClientsByNameOrPhoneNumberQuery, IEnumerable<FindClientsByNameOrPhoneNumberDto>>
    {
        private readonly ICheckRepository<Client> _clientsRepository;
        private readonly IMapper _mapper;

        public FindClientsByNameOrPhoneNumberQueryHandler(
            ICheckRepository<Client> clientsRepository,
            IMapper mapper)
        {
            _clientsRepository = clientsRepository;
            _mapper = mapper;
        }

        public async Task<IEnumerable<FindClientsByNameOrPhoneNumberDto>> Handle(FindClientsByNameOrPhoneNumberQuery request, CancellationToken cancellationToken)
        {
            if (request.Name == null && request.PhoneNumber == null) return _clientsRepository.GetAll().Select(_mapper.Map<FindClientsByNameOrPhoneNumberDto>);

            var clients =
                request.PhoneNumber != null ?
                _clientsRepository
                .FindBy(client => client.PhoneNumber.Contains(request.PhoneNumber))
                .ToList() :
                _clientsRepository
                .FindBy(client => client.FullName.Contains(request.Name))
                .ToList();

            return clients.Select(_mapper.Map<FindClientsByNameOrPhoneNumberDto>);
        }
    }
}
