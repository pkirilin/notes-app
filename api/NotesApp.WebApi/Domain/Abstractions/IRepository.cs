using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace NotesApp.WebApi.Domain.Abstractions
{
    public interface IRepository<T>
    {
        ValueTask<T> GetByIdAsync(int id, CancellationToken cancellationToken = default);

        Task<List<T>> GetAllAsync(CancellationToken cancellationToken = default);

        T Add(T entity);

        void Update(T entity);

        void Remove(T entity);

        IUnitOfWork UnitOfWork { get; }
    }
}
