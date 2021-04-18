using System;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using NotesApp.WebApi.Infrastructure;

namespace NotesApp.WebApi.IntegrationTests.Extensions
{
    public static class TestingExtensions
    {
        public static void PrepareDatabaseForIntegrationTests<TStartup>(this IServiceCollection services,
            bool reinitialize = false)
            where TStartup : class
        {
            var serviceProvider = services.BuildServiceProvider();
            
            using var scope = serviceProvider.CreateScope();
            var scopedServices = scope.ServiceProvider;
            var db = scopedServices.GetRequiredService<NotesAppDbContext>();
            var logger = scopedServices.GetRequiredService<ILogger<CustomWebApplicationFactory<TStartup>>>();

            db.Database.EnsureCreated();

            try
            {
                if (reinitialize)
                {
                    TestUtils.ReinitializeDbForTests(db);
                }
                else
                {
                    TestUtils.InitializeDbForTests(db);
                }
            }
            catch (Exception ex)
            {
                logger.LogError(ex, "An error occurred seeding the database with test messages. " +
                                    "Error: {Message}", ex.Message);
            }
        }

        public static WebApplicationFactory<TStartup> WithReinitializedData<TStartup>(
            this WebApplicationFactory<TStartup> factory)
            where TStartup : class
        {
            return factory.WithWebHostBuilder(builder =>
            {
                builder.ConfigureServices(services =>
                {
                    services.PrepareDatabaseForIntegrationTests<Startup>(reinitialize: true);
                });
            });
        }
    }
}