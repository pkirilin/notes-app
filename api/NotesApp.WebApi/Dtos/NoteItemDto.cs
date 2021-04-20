using System;
using System.Text.Json.Serialization;

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
    }
}