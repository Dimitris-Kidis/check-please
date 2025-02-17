using CheckPlease.Bot;
using MediatR;

namespace CheckPlease.Infrastructure.Configurations
{
    public static class ConfigureTelegramBot
    {
        public static IServiceCollection AddTelegramClient(this IServiceCollection services, WebApplicationBuilder builder)
        {
            //services.AddScoped<ITelegramApiClient, TelegramApiClient>();
            var telegramBotToken = builder.Configuration.GetConnectionString("telegramBotToken");

            //var bot = new TelegramBotService(telegramBotToken);
            //services.AddSingleton(bot);
            //bot.Start();

            services.AddSingleton<TelegramBotService>(provider =>
            {
                var mediator = provider.GetRequiredService<IMediator>();
                return new TelegramBotService(telegramBotToken, mediator);
            });

            var bot = services.BuildServiceProvider().GetRequiredService<TelegramBotService>();
            bot.Start();

            //var bot = new TelegramBotClient(telegramBotToken);
            //bot.StartReceiving();

            return services;
        }
    }
}
