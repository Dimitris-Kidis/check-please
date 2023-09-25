using ApplicationCore.Domain.Entities;
using Query.Clients.GetClientHistory;

namespace CheckPlease.Controllers.Clients.ViewModels
{
    public class GetClientHistoryViewModel
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
}
