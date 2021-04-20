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

        public Task<List<Note>> GetNotesForUserAsync(int userId, CancellationToken cancellationToken)
        {
            return CurrentSet.Where(n => n.UserId == userId).ToListAsync(cancellationToken);
        }
    }
}