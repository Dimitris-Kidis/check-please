using ApplicationCore.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace ApplicationCore.Services.Repository.CheckRepository
{

    public interface ICheckRepository<TEntity> where TEntity : BaseEntity
    {
        Task<TEntity> GetByIdAsync(int id, CancellationToken cancellationToken = default);
        TEntity Add(TEntity entity);
        TEntity Update(TEntity entity);
        void Delete(TEntity entity);
        void AddRange(IList<TEntity> entities);
        void UpdateRange(IEnumerable<TEntity> entities);
        void DeleteRange(IEnumerable<TEntity> entities);
        IQueryable<TEntity> GetAll();
        TEntity GetWithInclude(Expression<Func<TEntity, bool>>? predicate, params Expression<Func<TEntity, object>>[] paths);
        void Save();
        IEnumerable<TEntity> FindBy(Expression<Func<TEntity, bool>> predicate);
        IQueryable<TEntity> GetListWithInclude(Expression<Func<TEntity, bool>>? predicate, params Expression<Func<TEntity, object>>[] paths);


    }
}
