using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using NotesApp.WebApi.Domain.Services;

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
    }
}
