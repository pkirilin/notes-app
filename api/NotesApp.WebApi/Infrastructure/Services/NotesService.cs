using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using NotesApp.WebApi.Domain.Entities;
using NotesApp.WebApi.Domain.Exceptions;
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

        public async Task<NoteItemDto> CreateNoteAsync(int userId, NoteCreateEdit note, CancellationToken cancellationToken)
        {
            var noteEntity = new Note()
            {
                Text = note.Text,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow,
                UserId = userId,
            };

            var entry = _notesRepository.Add(noteEntity);
            await _notesRepository.UnitOfWork.SaveChangesAsync(cancellationToken);
            
            return new NoteItemDto()
            {
                Id = entry.Id,
                Text = entry.Text,
                CreatedAt = entry.CreatedAt,
                UpdatedAt = entry.UpdatedAt,
            };
        }

        public async Task EditNoteAsync(int userId, int id, NoteCreateEdit note, CancellationToken cancellationToken)
        {
            var noteForUpdate = await _notesRepository.GetByIdAsync(id, cancellationToken);
            noteForUpdate.Text = note.Text;
            noteForUpdate.UpdatedAt = DateTime.UtcNow;
            
            CheckUserId(noteForUpdate, userId);

            _notesRepository.Update(noteForUpdate);
            await _notesRepository.UnitOfWork.SaveChangesAsync(cancellationToken);
        }

        public async Task DeleteNoteAsync(int userId, int id, CancellationToken cancellationToken)
        {
            var noteForDelete = await _notesRepository.GetByIdAsync(id, cancellationToken);
            
            CheckUserId(noteForDelete, userId);
            
            _notesRepository.Remove(noteForDelete);
            await _notesRepository.UnitOfWork.SaveChangesAsync(cancellationToken);
        }

        private static void CheckUserId(Note note, int userId)
        {
            if (note.UserId != userId)
                throw new WrongAccessException("Wrong user id: access denied");
        }
    }
}