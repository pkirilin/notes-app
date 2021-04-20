using System.Collections.Generic;
using System.Text.Json;
using FluentAssertions;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.Extensions.DependencyInjection;
using NotesApp.WebApi.Dtos;
using NotesApp.WebApi.IntegrationTests.Extensions;
using NotesApp.WebApi.IntegrationTests.Helpers;
using Xunit;

namespace NotesApp.WebApi.IntegrationTests.Scenarios
{
    public class NotesIntegrationTests : IClassFixture<CustomWebApplicationFactory<Startup>>
    {
        private readonly CustomWebApplicationFactory<Startup> _factory;

        public NotesIntegrationTests(CustomWebApplicationFactory<Startup> factory)
        {
            _factory = factory;
        }

        [Fact]
        public async void ShouldReturnNotesForUser_WhenUserSpecifiedInHeaders()
        {
            // Arrange
            var client = _factory.WithWebHostBuilder(builder =>
            {
                builder.ConfigureServices(services =>
                {
                    services.AddAuthentication("Test")
                        .AddScheme<AuthenticationSchemeOptions, TestAuthHandler>("Test", _ => {});
                    
                    services.PrepareDatabaseForIntegrationTests<Startup>();
                });
            }).CreateClient(new WebApplicationFactoryClientOptions()
            {
                AllowAutoRedirect = false
            });
            
            client.DefaultRequestHeaders.Add("userId", "10");

            // Act
            var response = await client.GetAsync("/notes");
            var responseContent = await response.Content.ReadAsStringAsync();
            var responseNotes = JsonSerializer.Deserialize<List<NoteItemDto>>(responseContent);

            // Assert
            response.StatusCode.Should().Be(200);
            responseNotes.Should().Contain(n => n.Text == "Test note 1");
            responseNotes.Should().Contain(n => n.Text == "Test note 2");
        }
    }
}