namespace Queries.DTOs
{
    public class RepairDto
    {
        public Guid Id { get; set; }
        public string? Problems { get; set; }
        public int? Mileage { get; set; }
        public Guid ClientId { get; set; }
        public ClientDto Client { get; set; }
        public Guid CarId { get; set; }
        public CarDto Car { get; set; }
        public string? AdditionalNotes { get; set; }
        public int TotalRepairPrice { get; set; }
        public DateTimeOffset? RepairDate { get; set; }
        public bool IsSentToBot { get; set; }
        public string CreatedBy { get; set; }
        public string? LastModifiedBy { get; set; }
        public DateTimeOffset CreatedAt { get; set; }
        public DateTimeOffset? LastModifiedAt { get; set; }
        public ICollection<DetailDto> Details { get; set; }
    }
}
