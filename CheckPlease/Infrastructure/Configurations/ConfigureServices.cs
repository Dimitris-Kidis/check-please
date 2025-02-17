using Core.Services.EntityValidator;

namespace CheckPlease.Infrastructure.Configurations
{
    public static class ConfigureServices
    {
        public static IServiceCollection AddServices(this IServiceCollection services)
        {
            services.AddScoped(typeof(IEntityValidatorService<>), typeof(EntityValidatorService<>));

            return services;
        }
    }
}
