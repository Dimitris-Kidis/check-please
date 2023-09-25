using ApplicationCore.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Query.Clients.FindClientsByNameOrPhoneNumber
{
    public class FindClientsByNameOrPhoneNumberDto
    {
        public int Id { get; set; }
        public string? FullName { get; set; }
        public string PhoneNumber { get; set; } = null!;
        public string? Email { get; set; }
        public string? JobTitle { get; set; }
        public int? Age { get; set; }
        public string? Gender { get; set; }
    }
}
