using MediatR;
using Query.Repairs.GetRepairs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Query.Repairs.GetInfoForMainPage
{
    public class GetInfoForMainPageQuery : IRequest<GetInfoForMainPageDto>
    {
        public DateTimeOffset Date { get; set; }
    }
}
