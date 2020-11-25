using Microsoft.AspNetCore.Identity;
using System.Collections.Generic;

namespace NotesApp.WebApi.Entities
{
    public class User : IdentityUser<int>
    {
        public ICollection<Note> Notes { get; set; }
    }
}
