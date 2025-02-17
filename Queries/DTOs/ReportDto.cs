namespace Queries.DTOs
{
    public class ReportDto
    {
        public List<FileDto> Files { get; set; } = [];
        public string Message { get; set; }
    }
}
