using ApplicationCore.Domain.Entities;
using Query.Clients.GetClientHistory;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Query.Repairs.GetRepairs
{
    public class GetRepairsDto
    {
        public int Id { get; set; }
        public DateTimeOffset Date { get; set; }
        public string CarSign { get; set; }
        public int? Mileage { get; set; }
        public IEnumerable<DetailInfo> Details { get; set; }
    }
}
