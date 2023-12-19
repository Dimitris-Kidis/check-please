using MediatR;
using Query.Cars.FindCarsByCarSign;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Query.Repairs.GetRepairs
{
    public class GetRepairsQuery : IRequest<IEnumerable<GetRepairsDto>>
    {
        public bool? IsToday { get; set; } = false;
        public bool? IsYesterday { get; set; } = false;
        //public int? MinRepairCost { get; set; } = 0;
        public DateTimeOffset? Date { get; set; }
        public string CarSign { get; set; }
    }
}
