using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using NotesApp.WebApi.Domain.Entities;

namespace NotesApp.WebApi.Controllers
{
    [ApiController]
    [Authorize]
    [Route("notes")]
    public class NotesController : ControllerBase
    {
        [HttpGet]
        public async Task<IActionResult> GetNotes([FromHeader] int userId, CancellationToken cancellationToken)
        {
            return Ok(Enumerable.Empty<Note>());
        }
    }
}
