namespace CheckPlease.Infrastructure.Configurations
{
    public static class ConfigureProviders
    {
        public static IServiceCollection AddProviders(this IServiceCollection services)
        {
            //services.AddScoped<ICurrentUserProvider, CurrentUserProvider>();

            return services;
        }
    }
}
