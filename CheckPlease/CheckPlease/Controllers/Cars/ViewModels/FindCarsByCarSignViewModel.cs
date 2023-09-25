namespace CheckPlease.Controllers.Cars.ViewModels
{
    public class FindCarsByCarSignViewModel
    {
        public int Id { get; set; }
        public string CarSign { get; set; }
        public string? VinCode { get; set; }
        public int? Mileage { get; set; }
        public int? Year { get; set; }
        public string? Volume { get; set; }
        public string? Brand { get; set; }
        public string? Model { get; set; }
    }
}
