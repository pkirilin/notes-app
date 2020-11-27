using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using NotesApp.WebApi.Controllers;
using NotesApp.WebApi.Domain.Entities;
using NotesApp.WebApi.Infrastructure;

namespace NotesApp.WebApi.IntegrationTests
{
    public class TestStartup : Startup
    {
        public TestStartup(IConfiguration configuration) : base(configuration)
        {
        }

        protected override void AddDbContext(IServiceCollection services)
        {
            services.AddDbContext<NotesAppDbContext>(options =>
            {
                options.UseInMemoryDatabase("InMemoryAppDb");
            });

            using var scope = services.BuildServiceProvider().CreateScope();
            var context = scope.ServiceProvider.GetRequiredService<NotesAppDbContext>();
            SeedDatabase(context);
        }

        protected override void AddControllers(IServiceCollection services)
        {
            services.AddControllers()
                .AddApplicationPart(typeof(AuthController).Assembly);
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
