using ApplicationCore.Domain.Entities;
using ApplicationCore.Services.Repository.CheckRepository;
using ApplicationCore.Services.Repository.UserRepository;


namespace CheckPlease.Infrastructure.Configurations
{
    public static class ConfigureRepository
    {
        public static IServiceCollection AddRepository(this IServiceCollection services)
        {
            services.AddScoped(typeof(ICheckRepository<>), typeof(CheckRepository<>));
            services.AddScoped(typeof(IUserRepository<User>), typeof(UserRepository));
            return services;
        }
        
    }
}
