using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Reflection.Emit;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using static System.Net.Mime.MediaTypeNames;
using System.Xml.Linq;
using Microsoft.EntityFrameworkCore;
using ApplicationCore.Domain.Entities;

namespace ApplicationCore.Domain
{

    public class CheckPleaseDbContext : DbContext
    {
        public DbSet<Client> Clients { get; set; }
        public DbSet<Car> Cars { get; set; }
        public DbSet<Repair> Repairs { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Detail> Details { get; set; }


        public CheckPleaseDbContext()
        {

        }

        public CheckPleaseDbContext(DbContextOptions<CheckPleaseDbContext> options) : base(options)
        {
            
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
        }

    }
}
