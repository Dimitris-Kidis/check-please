namespace CheckPlease.Controllers.Clients.ViewModels
{
    public class GetAllClientsViewModel
    {
        public string? FullName { get; set; }
        public string PhoneNumber { get; set; } = null!;
        public string? Email { get; set; }
        public string? JobTitle { get; set; }
        public int? Age { get; set; }
        public string? Gender { get; set; }
        public int? CarsCount { get; set; }
    }
}
