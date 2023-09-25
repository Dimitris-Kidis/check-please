using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ApplicationCore.Domain.Entities
{
    public class Detail : BaseEntity
    {
        public string DetailName { get; set; }
        public int? PricePerOne { get; set; }
        public int? Quantity { get; set; }
        public int? DetailsPrice { get; set; }
        public int RepairPrice { get; set; }
        public int TotalPrice { get; set; }
        public int RepairId { get; set; }
        public Repair Repair { get; set; }
    }
}
