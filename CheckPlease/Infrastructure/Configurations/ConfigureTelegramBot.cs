using CheckPlease.Bot;
using MediatR;

namespace CheckPlease.Infrastructure.Configurations
{
    public static class ConfigureTelegramBot
    {
        public static IServiceCollection AddTelegramClient(this IServiceCollection services, WebApplicationBuilder builder)
        {
            var telegramBotToken = builder.Configuration.GetConnectionString("telegramBotToken");

            services.AddScoped(provider =>
            {
                var mediator = provider.GetRequiredService<IMediator>();
                return new TelegramBotService(telegramBotToken, mediator, builder.Configuration);
            });

            var bot = services.BuildServiceProvider().GetRequiredService<TelegramBotService>();
            bot.Start();

            return services;
        }
    }
}
