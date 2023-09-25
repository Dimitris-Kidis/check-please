using AutoMapper;

namespace CheckPlease.Infrastructure.Configurations
{
    public static class ConfigureMapper
    {
        public static IServiceCollection AddMapper(this IServiceCollection services)
        {

            services.AddAutoMapper(typeof(Program).Assembly, typeof(Query.Cars.GetAllCars.GetAllCarsQuery).Assembly);
            services.AddAutoMapper(typeof(Program).Assembly, typeof(Command.Car.CreateCar.CreateCarCommand).Assembly);
            services.AddAutoMapper(typeof(Program).Assembly, typeof(Controllers.Cars.MapperProfile).Assembly);
            return services;
        }
    }
}
