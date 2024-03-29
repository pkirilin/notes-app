using System.Collections.Generic;
using System.Net.Http;
using System.Text;
using System.Text.Json;
using System.Web;
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
        public async void GetNotes_ShouldReturnUserNotes_WhenUserSpecifiedInHeaders()
        {
            var client = _factory.CreateTestClient(userId: 10);
            
            var response = await client.GetAsync("/notes");
            var responseNotes = await response.ReadContentAsync<List<NoteItemDto>>();
            
            response.StatusCode.Should().Be(200);
            responseNotes.Should().Contain(n => n.Text == "Test note 1");
            responseNotes.Should().Contain(n => n.Text == "Test note 2");
            responseNotes.Should().Contain(n => n.Text == "Test note 4");
        }
        
        [Fact]
        public async void GetNotes_ShouldReturnUserNotesPage_WhenPageIndexAndPageSizeSpecified()
        {
            var client = _factory.CreateTestClient(userId: 10);
            
            var response = await client.GetAsync("/notes?pageIndex=1&pageSize=2");
            var responseNotes = await response.ReadContentAsync<List<NoteItemDto>>();
            
            response.StatusCode.Should().Be(200);
            responseNotes.Should().OnlyContain(n => n.Text == "Test note 4");
        }

        [Theory]
        [InlineData("note 2", 10, 1)]
        [InlineData("Test", 2, 2)]
        [InlineData("TEST", 10, 3)]
        [InlineData("   note  ", 10, 3)]
        public async void SearchNotes_ShouldReturnNotesMatchingTerm_WhenSearchTermIsNotEmpty(string term,
            int showCount,
            int resultsCount)
        {
            var client = _factory.CreateTestClient(userId: 10);
            var url = $"/notes/search?term={HttpUtility.UrlEncode(term)}&showCount={showCount}";
            
            var response = await client.GetAsync(url);
            var responseNotes = await response.ReadContentAsync<List<NoteItemDto>>();
            
            response.StatusCode.Should().Be(200);
            responseNotes.Should().HaveCount(resultsCount);
        }
        
        [Theory]
        [InlineData("")]
        [InlineData(null)]
        public async void SearchNotes_ShouldReturnAllNotes_WhenSearchTermIsEmpty(string term)
        {
            var client = _factory.CreateTestClient(userId: 10);
            var url = $"/notes/search?term={HttpUtility.UrlEncode(term)}";
            
            var response = await client.GetAsync(url);
            var responseNotes = await response.ReadContentAsync<List<NoteItemDto>>();
            
            response.StatusCode.Should().Be(200);
            responseNotes.Should().Contain(n => n.Text == "Test note 1");
            responseNotes.Should().Contain(n => n.Text == "Test note 2");
            responseNotes.Should().Contain(n => n.Text == "Test note 4");
        }

        [Fact]
        public async void PostNote_ShouldCreateAndReturnNote_WhenCorrectBodySpecified()
        {
            var client = _factory.CreateTestClient(userId: 10);
            var note = new NoteCreateEdit()
            {
                Text = "test",
            };
            var content = new StringContent(JsonSerializer.Serialize(note), Encoding.UTF8, "application/json");
            
            var response = await client.PostAsync("/notes", content);
            var responseNote = await response.ReadContentAsync<NoteItemDto>();
            var refreshedNotes = await (await client.GetAsync("/notes")).ReadContentAsync<List<NoteItemDto>>();

            response.StatusCode.Should().Be(200);
            refreshedNotes.Should().Contain(n => n.Text == "test");
            responseNote.Text.Should().Be("test");
        }
        
        [Fact]
        public async void PutNote_ShouldUpdateExistingAndReturnUpdatedNote_WhenCorrectIdAndBodySpecified()
        {
            var client = _factory.CreateTestClient(userId: 10);
            var note = new NoteCreateEdit()
            {
                Text = "test",
            };
            var content = new StringContent(JsonSerializer.Serialize(note), Encoding.UTF8, "application/json");

            var response = await client.PutAsync("/notes/1", content);
            var updatedNote = await response.ReadContentAsync<NoteItemDto>();
            var refreshedNotes = await (await client.GetAsync("/notes")).ReadContentAsync<List<NoteItemDto>>();
            
            response.StatusCode.Should().Be(200);
            updatedNote.Id.Should().Be(1);
            updatedNote.Text.Should().Be("test");
            refreshedNotes.Should().Contain(n => n.Id == 1 && n.Text == "test");
        }
        
        [Fact]
        public async void DeleteNote_ShouldDeleteExistingNote_WhenCorrectIdSpecified()
        {
            var client = _factory.CreateTestClient(userId: 10);

            var response = await client.DeleteAsync("/notes/1");
            var refreshedNotes = await (await client.GetAsync("/notes")).ReadContentAsync<List<NoteItemDto>>();
            
            response.StatusCode.Should().Be(200);
            refreshedNotes.Should().NotContain(n => n.Id == 1);
        }
    }
}