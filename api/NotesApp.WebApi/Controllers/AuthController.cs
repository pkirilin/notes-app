using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using NotesApp.WebApi.Domain.Entities;
using NotesApp.WebApi.Domain.Repositories;
using NotesApp.WebApi.Domain.Services;
using NotesApp.WebApi.Dtos;
using NotesApp.WebApi.Options;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace NotesApp.WebApi.Controllers
{
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IUsersRepository _usersRepository;
        private readonly IAuthService _authService;
        private readonly AuthOptions _authOptions;

        public AuthController(
            IUsersRepository usersRepository,
            IAuthService authService,
            IOptions<AuthOptions> authOptions)
        {
            _usersRepository = usersRepository;
            _authService = authService;
            _authOptions = authOptions?.Value;
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

            var expirationDate = DateTime.Now.AddDays(_authOptions.AccessTokenLifeTimeInDays);
            var jwtToken = _authService.GenerateJwtToken(user, expirationDate);
            var authResponse = new AuthResponseDto()
            {
                UserId = user.Id,
                UserName = user.UserName,
                Token = jwtToken,
                TokenExpirationInDays = _authOptions.AccessTokenLifeTimeInDays
            };

            return Ok(authResponse);
        }

        [HttpPost("register")]
        [ProducesResponseType(200)]
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
    }
}
