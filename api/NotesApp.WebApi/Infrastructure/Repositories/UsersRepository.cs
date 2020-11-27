using Microsoft.EntityFrameworkCore;
using NotesApp.WebApi.Domain.Entities;
using NotesApp.WebApi.Domain.Repositories;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace NotesApp.WebApi.Infrastructure.Repositories
{
    public class UsersRepository : RepositoryBase<User>, IUsersRepository
    {
        public UsersRepository(NotesAppDbContext context) : base(context)
        {
        }

        public Task<User> GetUserAsync(string userName, CancellationToken cancellationToken)
        {
            return CurrentSet.Where(u => u.UserName == userName).FirstOrDefaultAsync(cancellationToken);
        }
    }
}
