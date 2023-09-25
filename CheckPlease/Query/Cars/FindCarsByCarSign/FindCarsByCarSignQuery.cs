using MediatR;
using Query.Clients.GetClientHistory;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Query.Cars.FindCarsByCarSign
{
    public class FindCarsByCarSignQuery : IRequest<IEnumerable<FindCarsByCarSignDto>>
    {
        public string CarSign { get; set; }
    }
}
