using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using NotesApp.WebApi.Dtos;

namespace NotesApp.WebApi.Domain.Services
{
    public interface INotesService
    {
        Task<IEnumerable<NoteItemDto>> GetNotesAsync(int userId, int pageIndex, int pageSize,
            CancellationToken cancellationToken);

        Task<IEnumerable<NoteItemDto>> SearchNotesAsync(int userId, string term, int showCount,
            CancellationToken cancellationToken);

        Task<NoteItemDto> CreateNoteAsync(int userId, NoteCreateEdit note, CancellationToken cancellationToken);
        
        Task<NoteItemDto> EditNoteAsync(int userId, int id, NoteCreateEdit note, CancellationToken cancellationToken);
        
        Task DeleteNoteAsync(int userId, int id, CancellationToken cancellationToken);
    }
}