using Microsoft.EntityFrameworkCore;
using NotesApp.WebApi.Domain.Abstractions;
using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace NotesApp.WebApi.Infrastructure
{
    public class RepositoryBase<T> : IRepository<T> where T : class
    {
        protected readonly DbContext _context;

        protected DbSet<T> CurrentSet => _context.Set<T>();

        public RepositoryBase(DbContext context)
        {
            _context = context;
        }

        public IUnitOfWork UnitOfWork
        {
            get
            {
                if (_context is IUnitOfWork unitOfWork)
                    return unitOfWork;
                throw new NotImplementedException($"{typeof(IUnitOfWork)} is not implemented in {_context.GetType()}");
            }
        }

        public T Add(T entity)
        {
            return CurrentSet.Add(entity).Entity;
        }

        public Task<List<T>> GetAllAsync(CancellationToken cancellationToken = default)
        {
            return CurrentSet.ToListAsync(cancellationToken);
        }

        public ValueTask<T> GetByIdAsync(int id, CancellationToken cancellationToken = default)
        {
            return CurrentSet.FindAsync(new object[] { id }, cancellationToken);
        }

        public void Remove(T entity)
        {
            CurrentSet.Remove(entity);
        }

        public void Update(T entity)
        {
            CurrentSet.Update(entity);
        }
    }
}
