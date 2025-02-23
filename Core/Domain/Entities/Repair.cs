using Core.Interfaces;
using System.ComponentModel.DataAnnotations;

namespace Core.Domain.Entities
{
    public class Repair : IBaseEntity, IAdditionalNotes
    {
        public Guid Id { get; set; }
        public int Mileage { get; set; }
        public Guid ClientId { get; set; }
        public Client Client { get; set; }
        public Guid CarId { get; set; }
        public Car Car { get; set; }
        public string? AdditionalNotes { get; set; }
        public int TotalRepairPrice { get; set; }
        public DateTimeOffset? RepairDate { get; set; }
        public bool IsSentToBot { get; set; }
        public string CreatedBy { get; set; }
        public string? LastModifiedBy { get; set; }
        public DateTimeOffset CreatedAt { get; set; }
        public DateTimeOffset? LastModifiedAt { get; set; }
        [Timestamp]
        public byte[] RowVersion { get; set; }
        public ICollection<Detail> Details { get; set; }
    }
}
