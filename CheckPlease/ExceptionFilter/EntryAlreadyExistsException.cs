using System.Net;

namespace CheckPlease.ExceptionFilter
{
    public class EntryAlreadyExistsException(string message) : ApiException(HttpStatusCode.BadRequest, message)
    {
    }
}
