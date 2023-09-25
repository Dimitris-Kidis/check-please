using ApplicationCore.Domain;
using ApplicationCore.Domain.Entities;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace ApplicationCore.Services.Repository.UserRepository
{
    public class UserRepository : IUserRepository<User>
    {
        protected readonly CheckPleaseDbContext _dbContext;
        private readonly IMapper _mapper;

        public UserRepository(CheckPleaseDbContext dbContext, IMapper mapper)
        {
            _dbContext = dbContext;
            _mapper = mapper;
        }

        public IQueryable<User> GetAll()
        {
            var set = _dbContext.Set<User>();
            return set;
        }

        public User GetWithInclude(Expression<Func<User, bool>>? predicate, params Expression<Func<User, object>>[] paths)
        {
            IQueryable<User> queryable = _dbContext.Set<User>().Where(predicate);
            if (paths != null)
            {
                queryable = paths.Aggregate(queryable, (current, path) => current.Include(path));
            }
            List<User> list = queryable.ToList();
            int index = new Random().Next(list.Count);
            return list[index];
        }

        public User Update(User entity)
        {
            _dbContext.Entry(entity).State = EntityState.Modified;
            Audit(entity);
            return entity;
        }

        public IEnumerable<User> FindBy(Expression<Func<User, bool>> predicate)
        {
            IQueryable<User> queryable = _dbContext.Set<User>().Where(predicate);
            return queryable.AsEnumerable();
        }

        public User Add(User entity)
        {
            _dbContext.Set<User>().Add(entity);
            Audit(entity);
            return entity;
        }

        public void Save()
        {
            _dbContext.SaveChanges();
        }

        public void Delete(User entity)
        {
            _dbContext.Set<User>().Remove(entity);
        }

        public void DeleteRange(IEnumerable<User> entities)
        {
            _dbContext.Set<User>().RemoveRange(entities);
        }

        public async Task<User> GetByIdAsync(int id, CancellationToken cancellationToken = default) =>
            await _dbContext.Set<User>().SingleAsync(x => x.Id == id, cancellationToken);

        private void Audit(User Tentity)
        {
            var entries = _dbContext.ChangeTracker.Entries().Where(x => x.State == EntityState.Added || x.State == EntityState.Modified || x.Entity.GetType() == typeof(User));

            foreach (var entry in entries)
            {
                var now = DateTimeOffset.Now;
                var entity = entry.Entity as User;
                if (entry.Entity.GetType() == typeof(User))
                {
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
}
