using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using NotesApp.WebApi.Domain.Entities;

namespace NotesApp.WebApi.Domain.Repositories
{
    public interface INotesRepository
    {
        Task<List<Note>> GetNotesForUserAsync(int userId, CancellationToken cancellationToken);
    }
}