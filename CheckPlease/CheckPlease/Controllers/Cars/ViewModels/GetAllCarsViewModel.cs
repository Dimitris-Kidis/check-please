namespace CheckPlease.Controllers.Cars.ViewModels
{
    public class GetAllCarsViewModel
    {
        public string CarSign { get; set; }
        public string? VinCode { get; set; }
        public int? Mileage { get; set; }
        public int? Year { get; set; }
        public string? Volume { get; set; }
        public string? Brand { get; set; }
        public string? Model { get; set; }
        public string OwnersPhoneNumber { get; set; }
        public string? ClientsName { get; set; }
    }
}
