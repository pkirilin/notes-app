using System;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text.Json;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using NotesApp.WebApi.Infrastructure;
using NotesApp.WebApi.IntegrationTests.Helpers;

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
                    TestDatabaseSeeder.ReinitializeDbForTests(db);
                }
                else
                {
                    TestDatabaseSeeder.InitializeDbForTests(db);
                }
            }
            catch (Exception ex)
            {
                logger.LogError(ex, "An error occurred seeding the database with test messages. " +
                                    "Error: {Message}", ex.Message);
            }
        }
        
        public static HttpClient CreateTestClientWithoutAuth<TStartup>(this WebApplicationFactory<TStartup> factory)
            where TStartup : class
        {
            var client = factory.WithWebHostBuilder(builder =>
            {
                builder.ConfigureServices(services =>
                {
                    services.PrepareDatabaseForIntegrationTests<Startup>();
                });
            }).CreateClient();

            return client;
        }

        public static HttpClient CreateTestClient<TStartup>(this WebApplicationFactory<TStartup> factory, int userId)
            where TStartup : class
        {
            var client = factory.WithWebHostBuilder(builder =>
            {
                builder.ConfigureServices(services =>
                {
                    services.AddAuthentication("Test")
                        .AddScheme<AuthenticationSchemeOptions, TestAuthHandler>("Test", _ => {});
                    
                    services.PrepareDatabaseForIntegrationTests<Startup>(reinitialize: true);
                });
            }).CreateClient(new WebApplicationFactoryClientOptions()
            {
                AllowAutoRedirect = false
            });
            
            client.DefaultRequestHeaders.Add("userId", userId.ToString());
            // client.DefaultRequestHeaders.Add("Content-Type", "application/json");
            return client;
        }

        public static Task<HttpResponseMessage> PostDataAsync<T>(this HttpClient client, string requestUri, T body)
        {
            var content = new StringContent(JsonSerializer.Serialize(body));
            content.Headers.ContentType = new MediaTypeHeaderValue("application/json");
            return client.PostAsync(requestUri, content);
        }

        public static async Task<T> ReadContentAsync<T>(this HttpResponseMessage response)
        {
            var content = await response.Content.ReadAsStringAsync();
            return JsonSerializer.Deserialize<T>(content);
        }
    }
}