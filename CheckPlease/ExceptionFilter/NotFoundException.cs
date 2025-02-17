using System.Net;

namespace CheckPlease.ExceptionFilter
{
    public class NotFoundException(string message) : ApiException(HttpStatusCode.NotFound, message)
    {
    }
}
