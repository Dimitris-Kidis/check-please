using ApplicationCore.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Query.Clients.GetClientHistory
{
    public class GetClientHistoryDto
    {
        public int Id { get; set; }
        public string CarSign { get; set; }
        public string? VinCode { get; set; }
        public int? Mileage { get; set; }
        public int? Year { get; set; }
        public string? Volume { get; set; }
        public string? Brand { get; set; }
        public string? Model { get; set; }
        public DateTimeOffset RepairationDate { get; set; }
        public string? Problems { get; set; }
        public ICollection<DetailInfo> Details { get; set; }
    }

    public class DetailInfo
    {
        public string DetailName { get; set; }
        public int? PricePerOne { get; set; }
        public int? Quantity { get; set; }
        public int? DetailsPrice { get; set; }
        public int RepairPrice { get; set; }
        public int TotalPrice { get; set; }
    }
}
