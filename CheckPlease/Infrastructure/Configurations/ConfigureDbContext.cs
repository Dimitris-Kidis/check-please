using Core.Domain;
using Microsoft.EntityFrameworkCore;

namespace CheckPlease.Infrastructure.Configurations
{
    public static class ConfigureDbContext
    {
        public static IServiceCollection AddDbContext(this IServiceCollection services, WebApplicationBuilder builder) =>
            services.AddDbContext<CheckPleaseDbContext>(opt =>
            {
                opt.UseSqlServer(builder.Configuration.GetConnectionString("connectionString"));
            });
    }
}
