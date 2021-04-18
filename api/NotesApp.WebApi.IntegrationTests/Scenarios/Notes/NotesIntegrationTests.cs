using System;
using System.IO;
using FluentAssertions;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.Extensions.DependencyInjection;
using NotesApp.WebApi.IntegrationTests.Extensions;
using NotesApp.WebApi.IntegrationTests.Helpers;
using Xunit;

namespace NotesApp.WebApi.IntegrationTests.Scenarios.Notes
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
            
            var path = Path.Combine(Directory.GetCurrentDirectory(), "Scenarios", "Notes", "noteItemsResponse.json");
            var expectedResponse = await File.ReadAllTextAsync(path);

            // Act
            var response = await client.GetAsync("/notes");
            var responseContent = await response.Content.ReadAsStringAsync();

            // Assert
            response.StatusCode.Should().Be(200);
            responseContent.Should().Be(expectedResponse);
        }
    }
}