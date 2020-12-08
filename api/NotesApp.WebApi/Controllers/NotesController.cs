using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace NotesApp.WebApi.Controllers
{
    [ApiController]
    [Route("notes")]
    [Authorize]
    public class NotesController : ControllerBase
    {
        public NotesController()
        {
        }

        [HttpGet]
        public async Task<IActionResult> GetNotes()
        {
            await Task.CompletedTask;
            return Ok();
        }
    }
}
