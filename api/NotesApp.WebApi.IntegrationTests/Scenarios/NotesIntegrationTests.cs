using System.Collections.Generic;
using FluentAssertions;
using NotesApp.WebApi.Dtos;
using NotesApp.WebApi.IntegrationTests.Extensions;
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
        public async void GetNotes_ShouldReturnNotesForUser_WhenUserSpecifiedInHeaders()
        {
            // Arrange
            var client = _factory.CreateTestClient();
            client.DefaultRequestHeaders.Add("userId", "10");

            // Act
            var response = await client.GetAsync("/notes");
            var responseNotes = await response.ReadContentAsync<List<NoteItemDto>>();

            // Assert
            response.StatusCode.Should().Be(200);
            responseNotes.Should().Contain(n => n.Text == "Test note 1");
            responseNotes.Should().Contain(n => n.Text == "Test note 2");
        }
    }
}