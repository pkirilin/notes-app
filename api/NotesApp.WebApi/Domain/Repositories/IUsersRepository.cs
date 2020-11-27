using NotesApp.WebApi.Domain.Abstractions;
using NotesApp.WebApi.Domain.Entities;
using System.Threading;
using System.Threading.Tasks;

namespace NotesApp.WebApi.Domain.Repositories
{
    public interface IUsersRepository : IRepository<User>
    {
        Task<User> GetUserAsync(string userName, CancellationToken cancellationToken);
    }
}
