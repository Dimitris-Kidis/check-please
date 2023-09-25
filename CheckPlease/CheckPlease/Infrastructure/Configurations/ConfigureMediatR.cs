using Command.Car.CreateCar;
using MediatR;
using Query.Cars.GetAllCars;

namespace CheckPlease.Infrastructure.Configurations
{
    public static class ConfigureMediatR
    {
        public static IServiceCollection AddMediatRConfigs(this IServiceCollection services)
        {
            services.AddMediatR(typeof(GetAllCarsQueryHandler).Assembly);
            services.AddMediatR(typeof(CreateCarCommand).Assembly);
            return services;
        }

    }
}
