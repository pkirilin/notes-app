using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using NotesApp.WebApi.Domain.Abstractions;
using NotesApp.WebApi.Domain.Entities;

namespace NotesApp.WebApi.Domain.Repositories
{
    public interface INotesRepository : IRepository<Note>
    {
        Task<List<Note>> GetNotesForUserAsync(int userId, CancellationToken cancellationToken);
    }
}