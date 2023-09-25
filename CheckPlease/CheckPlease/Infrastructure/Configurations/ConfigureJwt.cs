//using TYPO.Identity;

using CheckPlease.Identity;

namespace CheckPlease.Infrastructure.Configurations
{
    public static class ConfigureJwt
    {
        public static IServiceCollection AddJwt(this IServiceCollection services)
        {
            services.AddScoped<JwtHandler>();
            services.AddJwtAuthentication();
            return services;
        }
    }
}
