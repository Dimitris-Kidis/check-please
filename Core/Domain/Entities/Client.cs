using Core.Interfaces;
using System.ComponentModel.DataAnnotations;

namespace Core.Domain.Entities
{
    public class Client : IBaseEntity, IAdditionalNotes
    {
        public Guid Id { get; set; }
        public string? FullName { get; set; }
        public string PhoneNumber { get; set; } = null!;
        public string? AdditionalNotes { get; set; }
        public string CreatedBy { get; set; }
        public string? LastModifiedBy { get; set; }
        public DateTimeOffset CreatedAt { get; set; }
        public DateTimeOffset? LastModifiedAt { get; set; }
        [Timestamp]
        public byte[] RowVersion { get; set; }
        public ICollection<Repair> Repairs { get; set; }
    }
}
