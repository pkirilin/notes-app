using System;
using System.Text.Json.Serialization;
using NotesApp.WebApi.Domain.Entities;

namespace NotesApp.WebApi.Dtos
{
    public class NoteItemDto
    {
        [JsonPropertyName("id")]
        public int Id { get; init; }

        [JsonPropertyName("text")]
        public string Text { get; init; }

        [JsonPropertyName("createdAt")]
        public DateTime CreatedAt { get; init; }

        [JsonPropertyName("updatedAt")]
        public DateTime UpdatedAt { get; init; }

        public NoteItemDto()
        {
        }
        
        public NoteItemDto(Note note)
        {
            Id = note.Id;
            Text = note.Text;
            CreatedAt = note.CreatedAt;
            UpdatedAt = note.UpdatedAt;
        }
    }
}