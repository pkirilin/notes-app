using NotesApp.WebApi.Dtos;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text.Json;
using Xunit;

namespace NotesApp.WebApi.IntegrationTests
{
    public class AuthControllerTests : IntegrationTestsScenarioBase
    {
        public AuthControllerTests(CustomWebApplicationFactory<TestStartup> factory) : base(factory)
        {
        }

        [Fact]
        public async void Login_ShouldAuthenticateUser()
        {
            // Arrange
            var userName = "user1";
            var password = "password1";
            var requestUri = $"/login?userName={userName}&password={password}";

            // Act
            var response = await _client.GetAsync(requestUri);

            // Assert
            response.EnsureSuccessStatusCode();
        }

        [Fact]
        public async void Register_ShouldCreateNewUser()
        {
            // Arrange
            var requestUri = "/register";
            var body = new RegistrationRequestDto()
            {
                UserName = "user_new",
                Password = "user_new_password"
            };
            var content = new StringContent(JsonSerializer.Serialize(body));
            content.Headers.ContentType = new MediaTypeHeaderValue("application/json");

            // Act
            var response = await _client.PostAsync(requestUri, content);

            // Assert
            response.EnsureSuccessStatusCode();
        }
    }
}
