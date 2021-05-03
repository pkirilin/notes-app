using System;

namespace NotesApp.WebApi.Domain.Exceptions
{
    public class WrongAccessException : Exception
    {
        public WrongAccessException(string message) : base(message)
        {
        }

        public WrongAccessException(string message, Exception innerException) : base(message, innerException)
        {
        }
    }
}