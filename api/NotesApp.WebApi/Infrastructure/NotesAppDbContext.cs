using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using NotesApp.WebApi.Domain.Abstractions;
using NotesApp.WebApi.Domain.Entities;

namespace NotesApp.WebApi.Infrastructure
{
    public class NotesAppDbContext : DbContext, IUnitOfWork
    {
        public NotesAppDbContext(DbContextOptions options) : base(options)
        {
        }

        public static readonly ILoggerFactory SqlLoggerFactory = LoggerFactory.Create(builder =>
        {
            builder.AddConsole();
        });

        public DbSet<User> Users { get; set; }

        public DbSet<Note> Notes { get; set; }
    }
}
