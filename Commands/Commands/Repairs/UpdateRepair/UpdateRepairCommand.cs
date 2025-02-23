using MediatR;

namespace Commands.Commands.Repairs.UpdateRepair
{
    public class UpdateRepairCommand : IRequest
    {
        public Guid Id { get; set; }
        public string? Problems { get; set; }
        public int Mileage { get; set; }
        public string? AdditionalNotes { get; set; }
        public int TotalRepairPrice { get; set; }
        public bool IsSentToBot { get; set; }
        public DateTimeOffset? RepairDate { get; set; }
        public ICollection<UpdateDetailCommand> Details { get; set; }
    }

    public class UpdateDetailCommand
    {
        public Guid Id { get; set; }
        public string DetailName { get; set; }
        public int? PricePerOne { get; set; }
        public int? Quantity { get; set; }
        public int? DetailsPrice { get; set; }
        public int RepairPrice { get; set; }
        public int TotalPrice { get; set; }
    }
}
