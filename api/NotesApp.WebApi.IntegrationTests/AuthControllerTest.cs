using NotesApp.WebApi.Dtos;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text.Json;
using Xunit;

namespace NotesApp.WebApi.IntegrationTests
{
    public class AuthControllerTest : IClassFixture<CustomWebApplicationFactory<Startup>>
    {
        private readonly CustomWebApplicationFactory<Startup> _factory;

        public AuthControllerTest(CustomWebApplicationFactory<Startup> factory)
        {
            _factory = factory;
        }

        [Fact]
        public async void Login_ShouldAuthenticateUser()
        {
            // Arrange
            var requestUri = $"/login?userName=user1&password=password1";
            var client = _factory.CreateClient();

            // Act
            var response = await client.GetAsync(requestUri);

            // Assert
            response.EnsureSuccessStatusCode();
        }

        [Fact]
        public async void Register_ShouldCreateNewUser()
        {
            // Arrange
            var body = new RegistrationRequestDto()
            {
                UserName = "user_new",
                Password = "user_new_password"
            };
            var content = new StringContent(JsonSerializer.Serialize(body));
            content.Headers.ContentType = new MediaTypeHeaderValue("application/json");
            var client = _factory.CreateClient();

            // Act
            var response = await client.PostAsync("/register", content);

            // Assert
            response.EnsureSuccessStatusCode();
        }
    }
}
