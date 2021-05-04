using Microsoft.EntityFrameworkCore;
using NotesApp.WebApi.Domain.Abstractions;
using NotesApp.WebApi.Domain.Entities;

namespace NotesApp.WebApi.Infrastructure
{
    public class NotesAppDbContext : DbContext, IUnitOfWork
    {
        public NotesAppDbContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<User> Users { get; set; }

        public DbSet<Note> Notes { get; set; }
    }
}
