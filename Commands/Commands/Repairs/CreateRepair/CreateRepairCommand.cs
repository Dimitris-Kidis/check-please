using MediatR;

namespace Commands.Commands.Repairs.CreateRepair
{
    public class CreateRepairCommand : IRequest<Guid>
    {
        public Guid ClientId { get; set; }
        public Guid CarId { get; set; }
        public string? AdditionalNotes { get; set; }
        public int Mileage { get; set; }
        public int TotalRepairPrice { get; set; }
        public DateTimeOffset? RepairDate { get; set; }
        public ICollection<CreateDetailCommand> Details { get; set; }
    }

    public class CreateDetailCommand
    {
        public string DetailName { get; set; }
        public int? PricePerOne { get; set; }
        public int? Quantity { get; set; }
        public int? DetailsPrice { get; set; }
        public int RepairPrice { get; set; }
        public int TotalPrice { get; set; }
    }
}
