using Core.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Core.Domain
{
    public class CheckPleaseDbContext : DbContext
    {
        public DbSet<Client> Clients { get; set; }
        public DbSet<Car> Cars { get; set; }
        public DbSet<Detail> Details { get; set; }
        public DbSet<Repair> Repairs { get; set; }

        public CheckPleaseDbContext() { }

        public CheckPleaseDbContext(DbContextOptions<CheckPleaseDbContext> options) : base(options) { }

        protected override void OnModelCreating(ModelBuilder builder)
        {

        }
    }
}
