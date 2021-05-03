using System.Text.Json.Serialization;

namespace NotesApp.WebApi.Dtos
{
    public class NoteCreateEdit
    {
        [JsonPropertyName("text")]
        public string Text { get; init; }
    }
}