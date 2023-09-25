using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ApplicationCore.Domain.Entities
{
    public class Car : BaseEntity
    {
        public string CarSign { get; set; }
        public string? VinCode { get; set; }
        public int? Mileage { get; set; }
        public int? Year { get; set; }
        public string? Volume { get; set; }
        public string? Brand { get; set; }
        public string? Model { get; set; }
        public ICollection<Repair> Repairs { get; set; }
    }
}
