using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using NotesApp.WebApi.Domain.Services;
using NotesApp.WebApi.Dtos;

namespace NotesApp.WebApi.Controllers
{
    [ApiController]
    [Authorize]
    [Route("notes")]
    public class NotesController : ControllerBase
    {
        private readonly INotesService _notesService;

        public NotesController(INotesService notesService)
        {
            _notesService = notesService;
        }

        [HttpGet]
        public async Task<IActionResult> GetNotes([FromHeader] int userId, CancellationToken cancellationToken)
        {
            var notes = await _notesService.GetNotesAsync(userId, cancellationToken);
            return Ok(notes);
        }

        [HttpPost]
        public async Task<IActionResult> CreateNote([FromHeader] int userId,
            [FromBody] NoteCreateEdit note,
            CancellationToken cancellationToken)
        {
            var createdNote = await _notesService.CreateNoteAsync(userId, note, cancellationToken);
            return Ok(createdNote);
        }
        
        [HttpPut("{id:int}")]
        public async Task<IActionResult> EditNote([FromHeader] int userId,
            [FromRoute] int id,
            [FromBody] NoteCreateEdit note,
            CancellationToken cancellationToken)
        {
            var updatedNote = await _notesService.EditNoteAsync(userId, id, note, cancellationToken);
            return Ok(updatedNote);
        }
        
        [HttpDelete("{id:int}")]
        public async Task<IActionResult> DeleteNote([FromHeader] int userId,
            [FromRoute] int id,
            CancellationToken cancellationToken)
        {
            await _notesService.DeleteNoteAsync(userId, id, cancellationToken);
            return Ok();
        }
    }
}
