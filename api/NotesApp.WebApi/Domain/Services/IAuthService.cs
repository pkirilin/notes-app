using NotesApp.WebApi.Domain.Entities;

namespace NotesApp.WebApi.Domain.Services
{
    public interface IAuthService
    {
        bool VerifyPasswordHash(string password, string passwordHash);

        string GeneratePasswordHash(string password);

        string GenerateJwtToken(User user);
    }
}
