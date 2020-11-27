namespace NotesApp.WebApi.Options
{
    public class AuthOptions
    {
        public string PrivateKey { get; set; }

        public int AccessTokenLifeTimeInDays { get; set; }
    }
}
