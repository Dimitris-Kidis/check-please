using ApplicationCore.Domain;
using ApplicationCore.Domain.Entities;
using Microsoft.AspNetCore.Identity;
using CheckPlease.Identity;

namespace CheckPlease.Infrastructure.Configurations
{

    public static class ConfigureIdentity
    {
        public static IdentityBuilder AddIdentityConfiguration(this IServiceCollection services) =>
            services.AddIdentity<User, Role>(options =>
                {
                    options.User.RequireUniqueEmail = false;
                })
                .AddEntityFrameworkStores<CheckPleaseDbContext>()
                .AddDefaultTokenProviders();
    }
}
