using CheckPlease.ExceptionFilter;
using CheckPlease.Infrastructure.Configurations;

var builder = WebApplication.CreateBuilder(args);

builder.Services
    .AddDbContext(builder)
    .AddRepositories()
    .AddServices()
    .AddProviders()
    .AddSwaggerServices()
    .AddMapper()
    .AddCorsPolicy()
    .AddMediatRConfigs()
    .AddTelegramClient(builder)
    .AddControllers(option => option.Filters.Add(typeof(ApiExceptionFilter)))
    .AddValidators();

if (builder.Environment.IsDevelopment())
{
    builder.Configuration.AddUserSecrets<Program>();
}

var app = builder.Build();
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(options => options.InjectStylesheet("/swagger-ui/custom.css"));
}

app.UseCors("AllowAllOrigins");

app.UseRouting();

app.UseAuthentication();
app.UseAuthorization();

app.UseStaticFiles();
app.UseHttpsRedirection();
app.UseErrorHandlingMiddleware();
app.UseDbTransactionMiddleware();

app.MapControllers();

await app.RunAsync();