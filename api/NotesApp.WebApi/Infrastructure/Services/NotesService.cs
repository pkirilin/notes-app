using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using NotesApp.WebApi.Domain.Repositories;
using NotesApp.WebApi.Domain.Services;
using NotesApp.WebApi.Dtos;

namespace NotesApp.WebApi.Infrastructure.Services
{
    public class NotesService : INotesService
    {
        private readonly INotesRepository _notesRepository;

        public NotesService(INotesRepository notesRepository)
        {
            _notesRepository = notesRepository;
        }

        public async Task<IEnumerable<NoteItemDto>> GetNotesAsync(int userId, CancellationToken cancellationToken)
        {
            var noteEntities = await _notesRepository.GetNotesForUserAsync(userId, cancellationToken);

            return noteEntities.Select(n => new NoteItemDto()
            {
                Id = n.Id,
                Text = n.Text,
                CreatedAt = n.CreatedAt,
                UpdatedAt = n.UpdatedAt
            });
        }
    }
}