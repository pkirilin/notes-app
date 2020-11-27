using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.Extensions.Configuration;
using NotesApp.WebApi.Domain.Entities;
using NotesApp.WebApi.Infrastructure;

namespace NotesApp.WebApi.IntegrationTests
{
    public class CustomWebApplicationFactory<TStartup> : WebApplicationFactory<TStartup> where TStartup : class
    {
        protected override IWebHostBuilder CreateWebHostBuilder()
        {
            var webHostBuilder = WebHost.CreateDefaultBuilder()
                .ConfigureAppConfiguration(builder =>
                {
                    builder.AddJsonFile("appsettings.test.json", false);
                    builder.AddEnvironmentVariables();
                })
                .UseStartup<TStartup>();

            return webHostBuilder;
        }

        protected override void ConfigureWebHost(IWebHostBuilder builder)
        {
            builder.UseContentRoot(".");
            builder.UseEnvironment("Test");
            builder.ConfigureServices(services =>
            {

            });
            base.ConfigureWebHost(builder);
        }

        private static void SeedDatabase(NotesAppDbContext context)
        {
            context.Database.EnsureCreated();

            FillUsers(context);

            context.SaveChanges();
        }

        private static void FillUsers(NotesAppDbContext context)
        {
            context.Users.Add(new User()
            {
                Id = 1,
                UserName = "user1",
                PasswordHash = "$2y$12$ntbaDBt0I8TnUyI1JSJaYeYPNgik2q9Jg/RifpGB9DFSWuJT.p9mq"
            });
        }
    }
}
