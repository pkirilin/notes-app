using System.ComponentModel.DataAnnotations;

namespace NotesApp.WebApi.Dtos
{
    public class RegistrationRequestDto
    {
        [Required]
        [StringLength(50, MinimumLength = 3)]
        public string UserName { get; set; }

        [Required]
        [StringLength(50, MinimumLength = 1)]
        public string Password { get; set; }
    }
}
