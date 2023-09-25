using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static System.Net.Mime.MediaTypeNames;

namespace ApplicationCore.Domain.Entities
{
    public class User : IdentityUser<int>
    {
        [Timestamp]
        public byte[] RowVersion { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string CreatedBy { get; set; }
        public string? LastModifiedBy { get; set; }
        public DateTimeOffset CreatedAt { get; set; }
        public DateTimeOffset? LastModifiedAt { get; set; }

    }
}
