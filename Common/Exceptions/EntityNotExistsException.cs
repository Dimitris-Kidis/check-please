namespace Common.Exceptions;

public sealed class EntityNotExistsException : Exception
{
    public EntityNotExistsException()
    {
    }

    public EntityNotExistsException(string message)
        : base(message)
    {
    }

    public EntityNotExistsException(string message, Exception innerException)
        : base(message, innerException)
    {
    }
}
