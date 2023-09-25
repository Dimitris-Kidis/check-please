using ApplicationCore.Domain.Entities;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Command.Repair.CreateRepair
{
    public class CreateRepairCommand : IRequest<int>
    {
        public string? Problems { get; set; }
        public int? Mileage { get; set; }
        public ICollection<CreateDetail> Details { get; set; }
        public int ClientId { get; set; }
        public int CarId { get; set; }
    }

    public class CreateDetail
    {
        public string DetailName { get; set; }
        public int? PricePerOne { get; set; }
        public int? Quantity { get; set; }
        public int RepairPrice { get; set; }
    }
}
