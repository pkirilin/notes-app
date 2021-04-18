using NotesApp.WebApi.Domain.Entities;
using NotesApp.WebApi.Infrastructure;

namespace NotesApp.WebApi.IntegrationTests
{
    public static class TestUtils
    {
        public static void InitializeDbForTests(NotesAppDbContext db)
        {
            FillUsers(db);
            
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
    }
}