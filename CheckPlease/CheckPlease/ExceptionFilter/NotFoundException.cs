using System.Net;

namespace CheckPlease.ExceptionFilter
{
    public class NotFoundException : ApiException
    {
        public NotFoundException(string message) : base(HttpStatusCode.NotFound, message)
        {
        }
    }
}
