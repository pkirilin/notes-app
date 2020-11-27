using Microsoft.AspNetCore.Mvc;
using NotesApp.WebApi.Domain.Entities;
using NotesApp.WebApi.Domain.Repositories;
using NotesApp.WebApi.Domain.Services;
using NotesApp.WebApi.Dtos;
using System.Threading;
using System.Threading.Tasks;

namespace NotesApp.WebApi.Controllers
{
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IUsersRepository _usersRepository;
        private readonly IAuthService _authService;

        public AuthController(IUsersRepository usersRepository, IAuthService authService)
        {
            _usersRepository = usersRepository;
            _authService = authService;
        }

        [HttpGet("login")]
        [ProducesResponseType(200, Type = typeof(AuthResponseDto))]
        public async Task<IActionResult> Login(string userName, string password, CancellationToken cancellationToken)
        {
            var user = await _usersRepository.GetUserAsync(userName, cancellationToken);

            if (user == null)
                return NotFound($"User '{userName}' not found");

            if (!_authService.VerifyPasswordHash(password, user.PasswordHash))
                return BadRequest($"Password '{password}' is incorrect");

            var jwtToken = _authService.GenerateJwtToken(user);
            var loginResponse = new AuthResponseDto()
            {
                UserId = user.Id,
                UserName = user.UserName,
                Token = jwtToken
            };

            return Ok(loginResponse);
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegistrationRequestDto registrationData, CancellationToken cancellationToken)
        {
            var userWithTheSameName = await _usersRepository.GetUserAsync(registrationData.Login, cancellationToken);

            if (userWithTheSameName != null)
                return BadRequest($"User with name '{registrationData.Login}' already exists");

            var passwordHash = _authService.GeneratePasswordHash(registrationData.Password);

            var user = new User()
            {
                UserName = registrationData.Login,
                PasswordHash = passwordHash
            };

            _usersRepository.Add(user);
            await _usersRepository.UnitOfWork.SaveChangesAsync(cancellationToken);
            return Ok();
        }

        [HttpPost("logout")]
        public async Task<IActionResult> Logout()
        {
            await Task.CompletedTask;
            return Ok();
        }
    }
}
