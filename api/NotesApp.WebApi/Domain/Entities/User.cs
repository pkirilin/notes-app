using System.Collections.Generic;

namespace NotesApp.WebApi.Domain.Entities
{
    public class User
    {
        public int Id { get; set; }

        public string UserName { get; set; }

        public string PasswordHash { get; set; }

        public ICollection<Note> Notes { get; set; }
    }
}
