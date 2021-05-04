using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using NotesApp.WebApi.Dtos;

namespace NotesApp.WebApi.Domain.Services
{
    public interface INotesService
    {
        Task<IEnumerable<NoteItemDto>> GetNotesAsync(int userId, CancellationToken cancellationToken);

        Task<NoteItemDto> CreateNoteAsync(int userId, NoteCreateEdit note, CancellationToken cancellationToken);
        
        Task<NoteItemDto> EditNoteAsync(int userId, int id, NoteCreateEdit note, CancellationToken cancellationToken);
        
        Task DeleteNoteAsync(int userId, int id, CancellationToken cancellationToken);
    }
}