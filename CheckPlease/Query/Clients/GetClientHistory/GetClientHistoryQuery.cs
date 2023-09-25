using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Query.Clients.GetClientHistory
{
    public class GetClientHistoryQuery : IRequest<IEnumerable<GetClientHistoryDto>>
    {
        public string CarSign { get; set; }
    }
}
