namespace CheckPlease.Infrastructure.Configurations
{
    public static class ConfigureValidators
    {
        public static IMvcBuilder AddValidators(this IMvcBuilder builder)
        {
            //builder.Services.AddFluentValidationAutoValidation();
            //builder.Services.AddFluentValidationClientsideAdapters();
            //builder.Services.AddValidatorsFromAssembly(typeof(Commands.Commands.Auth.Registration.RegistrationCommand).Assembly);

            return builder;
        }
    }
}
