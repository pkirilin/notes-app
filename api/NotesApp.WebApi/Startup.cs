using System.Net;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using NotesApp.WebApi.Domain.Repositories;
using NotesApp.WebApi.Domain.Services;
using NotesApp.WebApi.Infrastructure;
using NotesApp.WebApi.Infrastructure.Repositories;
using NotesApp.WebApi.Infrastructure.Services;
using NotesApp.WebApi.Options;
using System.Text;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Http;
using NotesApp.WebApi.Domain.Exceptions;

namespace NotesApp.WebApi
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.Configure<AuthOptions>(Configuration.GetSection("AuthOptions"));

            services.AddDbContext<NotesAppDbContext>(options =>
            {
                options.UseNpgsql(Configuration.GetConnectionString("NotesAppDbContext"));
            });

            services.AddCors(options => options.AddPolicy("DefaultPolicy", builder =>
                builder.WithOrigins(Configuration.GetValue<string>("AllowedHosts"))
                    .AllowAnyHeader()
                    .AllowAnyMethod()));

            services.AddScoped<IUsersRepository, UsersRepository>();
            services.AddScoped<INotesRepository, NotesRepository>();
            
            services.AddScoped<IAuthService, AuthService>();
            services.AddScoped<INotesService, NotesService>();

            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(options =>
                {
                    options.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuerSigningKey = true,
                        IssuerSigningKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(Configuration.GetSection("AuthOptions:PrivateKey").Value)),
                        ValidateIssuer = false,
                        ValidateAudience = false
                    };
                });

            services.AddControllers();

            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "NotesApp.WebApi", Version = "v1" });
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env, NotesAppDbContext dbContext)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "NotesApp.WebApi v1"));
            }

            app.UseExceptionHandler(builder =>
            {
                builder.Run(async context =>
                {
                    context.Response.StatusCode = (int) HttpStatusCode.InternalServerError;
                    context.Response.ContentType = "text/plain";
                    
                    var exception = context.Features.Get<IExceptionHandlerPathFeature>().Error;

                    if (exception is WrongAccessException)
                    {
                        context.Response.StatusCode = (int) HttpStatusCode.Forbidden;
                    }
                    
                    await context.Response.WriteAsync("Error: " + exception.Message);
                });
            });
            
            app.UseCors("DefaultPolicy");
            app.UseHttpsRedirection();
            app.UseRouting();
            app.UseAuthentication();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
