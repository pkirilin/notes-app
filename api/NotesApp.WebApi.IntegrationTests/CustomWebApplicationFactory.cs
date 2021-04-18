using System.Linq;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using NotesApp.WebApi.Infrastructure;
using NotesApp.WebApi.IntegrationTests.Extensions;

namespace NotesApp.WebApi.IntegrationTests
{
    // ReSharper disable once ClassNeverInstantiated.Global
    public class CustomWebApplicationFactory<TStartup> : WebApplicationFactory<TStartup> where TStartup : class
    {
        protected override void ConfigureWebHost(IWebHostBuilder builder)
        {
            builder.ConfigureServices(services =>
            {
                var descriptor = services.SingleOrDefault(d => 
                    d.ServiceType == typeof(DbContextOptions<NotesAppDbContext>));

                services.Remove(descriptor);

                services.AddDbContext<NotesAppDbContext>(options =>
                {
                    options.UseInMemoryDatabase("InMemoryDbForTesting");
                });

                services.PrepareDatabaseForIntegrationTests<TStartup>();
            });
        }
    }
}
