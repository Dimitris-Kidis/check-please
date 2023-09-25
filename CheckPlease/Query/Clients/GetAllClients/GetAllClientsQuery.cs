using MediatR;
using Query.Cars.GetAllCars;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Query.Clients.GetAllClients
{
    public class GetAllClientsQuery : IRequest<IEnumerable<GetAllClientsDto>>
    {
    }
}
