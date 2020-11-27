using System;

namespace NotesApp.WebApi.Domain.Entities
{
    public class Note
    {
        public int Id { get; set; }

        public string Text { get; set; }

        public DateTime CreatedAt { get; set; }

        public DateTime UpdatedAt { get; set; }

        public int UserId { get; set; }

        public User User { get; set; }
    }
}
