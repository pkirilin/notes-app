using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using NotesApp.WebApi.Dtos;

namespace NotesApp.WebApi.Domain.Services
{
    public interface INotesService
    {
        Task<IEnumerable<NoteItemDto>> GetNotesAsync(int userId, CancellationToken cancellationToken);
    }
}