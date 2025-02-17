using Core.Interfaces;

namespace Core.Services.EntityValidator;

public interface IEntityValidatorService<TEntity> where TEntity : IBaseEntity
{
    Task EntityExistsAsync(Guid entityId, CancellationToken token);
    void EntityExists(TEntity? entity, Guid entityId);
}
