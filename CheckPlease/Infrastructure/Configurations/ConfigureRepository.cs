using Core.Repositories.CheckPleaseRepository;

namespace CheckPlease.Infrastructure.Configurations
{
    public static class ConfigureRepository
    {
        public static IServiceCollection AddRepositories(this IServiceCollection services)
        {
            services.AddScoped(typeof(ICheckPleaseRepository<>), typeof(CheckPleaseRepository<>));

            return services;
        }
    }
}
