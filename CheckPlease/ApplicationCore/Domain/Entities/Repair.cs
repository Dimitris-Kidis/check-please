using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ApplicationCore.Domain.Entities
{
    public class Repair : BaseEntity
    {
        public string? Problems { get; set; }
        public int? Mileage { get; set; }
        public ICollection<Detail> Details { get; set; }
        public int ClientId { get; set; }
        public Client Client { get; set; }
        public int CarId { get; set; }
        public Car Car { get; set; }
    }
}
