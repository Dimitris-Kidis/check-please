using ApplicationCore.Domain;
using ApplicationCore.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;
using AutoMapper;

namespace ApplicationCore.Services.Repository.CheckRepository
{
    public class CheckRepository<TEntity> : ICheckRepository<TEntity> where TEntity : BaseEntity
    {
        protected readonly CheckPleaseDbContext _dbContext;
        private readonly IMapper _mapper;

        public CheckRepository(CheckPleaseDbContext dbContext, IMapper mapper)
        {
            _dbContext = dbContext;
            _mapper = mapper;
        }

        public async Task<TEntity> GetByIdAsync(int id, CancellationToken cancellationToken = default) =>
            await _dbContext.Set<TEntity>().SingleAsync(x => x.Id == id, cancellationToken);

        public TEntity Add(TEntity entity)
        {
            _dbContext.Set<TEntity>().Add(entity);
            Audit();
            return entity;
        }

        public TEntity Update(TEntity entity)
        {
            _dbContext.Entry(entity).State = EntityState.Modified;
            Audit();
            return entity;
        }

        public void Delete(TEntity entity)
        {
            _dbContext.Set<TEntity>().Remove(entity);
        }

        public void AddRange(IList<TEntity> entities)
        {
            _dbContext.Set<TEntity>().AddRange(entities);
            Audit();
        }

        public IEnumerable<TEntity> FindBy(Expression<Func<TEntity, bool>> predicate)
        {
            IQueryable<TEntity> queryable = _dbContext.Set<TEntity>().Where(predicate);
            return queryable.AsEnumerable();
        }

        public void UpdateRange(IEnumerable<TEntity> entities)
        {
            _dbContext.Set<TEntity>().UpdateRange(entities);
            Audit();
        }

        public void DeleteRange(IEnumerable<TEntity> entities)
        {
            _dbContext.Set<TEntity>().RemoveRange(entities);
        }

        public IQueryable<TEntity> GetAll()
        {
            var set = _dbContext.Set<TEntity>();
            return set;
        }
        public void Save()
        {
            _dbContext.SaveChanges();
        }

        public TEntity GetWithInclude(Expression<Func<TEntity, bool>>? predicate, params Expression<Func<TEntity, object>>[] paths)
        {
            IQueryable<TEntity> queryable = _dbContext.Set<TEntity>().Where(predicate);
            if (paths != null)
            {
                queryable = paths.Aggregate(queryable, (current, path) => current.Include(path));
            }
            List<TEntity> list = queryable.ToList();
            int index = new Random().Next(list.Count);
            return list[index];
        }

        public IQueryable<TEntity> GetListWithInclude(Expression<Func<TEntity, bool>>? predicate, params Expression<Func<TEntity, object>>[] paths)
        {
            IQueryable<TEntity> queryable = _dbContext.Set<TEntity>().Where(predicate);
            if (paths != null)
            {
                queryable = paths.Aggregate(queryable, (current, path) => current.Include(path));
            }
            return queryable;
        }

        private void Audit()
        {
            var entries = _dbContext.ChangeTracker.Entries().Where(x => x.State == EntityState.Added || x.State == EntityState.Modified);

            foreach (var entry in entries)
            {
                var now = DateTimeOffset.Now;
                var entity = (BaseEntity)entry.Entity;

                if (entry.State == EntityState.Added)
                {
                    entity.CreatedAt = now;
                    entity.CreatedBy = "admin";
                }
                else if (entry.State == EntityState.Modified)
                {
                    entity.LastModifiedAt = now;
                    entity.LastModifiedBy = "admin";
                }
            }
        }
    }
}
