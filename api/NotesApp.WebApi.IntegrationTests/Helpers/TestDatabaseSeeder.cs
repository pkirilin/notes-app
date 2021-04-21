using System;
using NotesApp.WebApi.Domain.Entities;
using NotesApp.WebApi.Infrastructure;

namespace NotesApp.WebApi.IntegrationTests.Helpers
{
    public static class TestDatabaseSeeder
    {
        public static void InitializeDbForTests(NotesAppDbContext db)
        {
            FillUsers(db);
            FillNotes(db);
            
            db.SaveChanges();
        }
        
        public static void ReinitializeDbForTests(NotesAppDbContext db)
        {
            db.Users.RemoveRange(db.Users);
            db.Notes.RemoveRange(db.Notes);
            
            InitializeDbForTests(db);
        }

        private static void FillUsers(NotesAppDbContext db)
        {
            db.Users.Add(new User()
            {
                Id = 1,
                UserName = "user1",
                PasswordHash = "$2y$12$ntbaDBt0I8TnUyI1JSJaYeYPNgik2q9Jg/RifpGB9DFSWuJT.p9mq"
            });
        }
        
        private static void FillNotes(NotesAppDbContext db)
        {
            db.Notes.Add(new Note()
            {
                Id = 1,
                Text = "Test note 1",
                CreatedAt = DateTime.Parse("2021-04-17"),
                UpdatedAt = DateTime.Parse("2021-04-17"),
                UserId = 10
            });
            
            db.Notes.Add(new Note()
            {
                Id = 2,
                Text = "Test note 2",
                CreatedAt = DateTime.Parse("2021-04-18"),
                UpdatedAt = DateTime.Parse("2021-04-18"),
                UserId = 10
            });
            
            db.Notes.Add(new Note()
            {
                Id = 3,
                Text = "Test note 3",
                CreatedAt = DateTime.Parse("2021-04-19"),
                UpdatedAt = DateTime.Parse("2021-04-19"),
                UserId = 1
            });
        }
    }
}