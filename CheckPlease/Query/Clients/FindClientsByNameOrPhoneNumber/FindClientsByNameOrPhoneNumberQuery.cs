using MediatR;
using Query.Cars.FindCarsByCarSign;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Query.Clients.FindClientsByNameOrPhoneNumber
{
    public class FindClientsByNameOrPhoneNumberQuery : IRequest<IEnumerable<FindClientsByNameOrPhoneNumberDto>>
    {
        public string? PhoneNumber { get; set; }
        public string? Name { get; set; }
    }
}
