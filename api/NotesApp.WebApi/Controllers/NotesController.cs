using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace NotesApp.WebApi.Controllers
{
    [ApiController]
    [Route("notes")]
    public class NotesController : ControllerBase
    {
        public NotesController()
        {
        }

        [HttpGet]
        public async Task<IActionResult> GetNotes()
        {
            return Ok();
        }
    }
}
