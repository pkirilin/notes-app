using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using NotesApp.WebApi.Domain.Entities;
using NotesApp.WebApi.Domain.Repositories;

namespace NotesApp.WebApi.Infrastructure.Repositories
{
    public class NotesRepository : RepositoryBase<Note>, INotesRepository
    {
        public NotesRepository(NotesAppDbContext context) : base(context)
        {
        }

        public Task<List<Note>> GetUserNotesAsync(int userId, int pageIndex, int pageSize,
            CancellationToken cancellationToken)
        {
            return CurrentSet.Where(n => n.UserId == userId)
                .OrderByDescending(n => n.UpdatedAt)
                .Skip(pageIndex * pageSize)
                .Take(pageSize)
                .ToListAsync(cancellationToken);
        }

        public Task<List<Note>> GetUserNotesByTextAsync(int userId, string text, int showCount,
            CancellationToken cancellationToken)
        {
            return CurrentSet.Where(n => n.UserId == userId)
                .Where(n => n.Text.Trim().ToLower().Contains(text.Trim().ToLower()))
                .OrderByDescending(n => n.UpdatedAt)
                .Take(showCount)
                .ToListAsync(cancellationToken);
        }
    }
}