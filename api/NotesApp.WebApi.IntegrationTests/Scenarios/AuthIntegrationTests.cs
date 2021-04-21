using FluentAssertions;
using NotesApp.WebApi.Dtos;
using NotesApp.WebApi.IntegrationTests.Extensions;
using Xunit;

namespace NotesApp.WebApi.IntegrationTests.Scenarios
{
    public class AuthIntegrationTests : IClassFixture<CustomWebApplicationFactory<Startup>>
    {
        private readonly CustomWebApplicationFactory<Startup> _factory;

        public AuthIntegrationTests(CustomWebApplicationFactory<Startup> factory)
        {
            _factory = factory;
        }

        [Fact]
        public async void Login_ShouldAuthenticateUser()
        {
            // Arrange
            var client = _factory.CreateTestClientWithoutAuth();

            // Act
            var response = await client.GetAsync("/login?userName=user1&password=password1");

            // Assert
            response.StatusCode.Should().Be(200);
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
            var client = _factory.CreateTestClientWithoutAuth();

            // Act
            var response = await client.PostDataAsync("/register", body);

            // Assert
            response.StatusCode.Should().Be(200);
        }
    }
}
