using Commands.Commands.Clients.CreateClient;
using Queries.Queries.Cars.GetCar;

namespace CheckPlease.Infrastructure.Configurations
{
    public static class ConfigureMapper
    {
        public static IServiceCollection AddMapper(this IServiceCollection services)
        {
            services.AddAutoMapper(typeof(Program).Assembly, typeof(CreateClientCommand).Assembly);
            services.AddAutoMapper(typeof(Program).Assembly, typeof(GetCarQuery).Assembly);

            return services;
        }
    }
}
