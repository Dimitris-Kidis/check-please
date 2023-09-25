//var builder = WebApplication.CreateBuilder(args);

//// Add services to the container.
//builder.Services.AddRazorPages();

//var app = builder.Build();

//// Configure the HTTP request pipeline.
//if (!app.Environment.IsDevelopment())
//{
//    app.UseExceptionHandler("/Error");
//    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
//    app.UseHsts();
//}

//app.UseHttpsRedirection();
//app.UseStaticFiles();

//app.UseRouting();

//app.UseAuthorization();

//app.MapRazorPages();

//app.Run();
//.............................

using CheckPlease.ExceptionFilter;
using CheckPlease.Infrastructure.Configurations;
using Microsoft.AspNetCore.Mvc.Filters;
using CheckPlease.Infrastructure.Configurations;

// check the commit

var builder = WebApplication.CreateBuilder(args);

builder.Services
    .AddRepository()
    .AddDbContext(builder)
    .AddMapper()
    .AddCorsPolicy()
    .AddSwaggerServices()
    .AddMediatRConfigs()
    .AddControllers(option => option.Filters.Add(typeof(ApiExceptionFilter)))
    .AddValidators();
builder.Services.AddJwt().AddIdentityConfiguration();






var app = builder.Build();
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(options =>
    {
        options.InjectStylesheet("/swagger-ui/custom.css");
    });
}

app.UseStaticFiles();
app.UseCors();

app.UseErrorHandlingMiddleware();

app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();

app.UseDbTransactionMiddleware();

app.MapControllers();

app.Run();