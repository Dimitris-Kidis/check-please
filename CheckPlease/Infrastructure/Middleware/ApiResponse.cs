namespace CheckPlease.Infrastructure.Middleware
{
    // REFACTO
    public class ApiResponse
    {
        public int StatusCode { get; set; }
        public string Message { get; set; }
        public ApiResponse(int statusCode, string message = null)
        {
            StatusCode = statusCode;
            Message = message ?? GetDefaultMessageForStatusCode(statusCode);
        }

        private string GetDefaultMessageForStatusCode(int statusCode)
        {
            return statusCode switch
            {
                400 => "Bad request",
                401 => "Not authorized",
                404 => "Not Found",
                500 => "Internal server error",
                _ => ""
            };
        }
    }
}
