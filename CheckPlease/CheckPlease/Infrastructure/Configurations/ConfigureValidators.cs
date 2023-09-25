using FluentValidation.AspNetCore;

namespace CheckPlease.Infrastructure.Configurations
{
    public static class ConfigureValidators
    {
        public static IMvcBuilder AddValidators(this IMvcBuilder services) =>
            services.AddFluentValidation(opt => opt.RegisterValidatorsFromAssembly(typeof(Command.Car.CreateCar.CreateCarCommand).Assembly));
    }
}
