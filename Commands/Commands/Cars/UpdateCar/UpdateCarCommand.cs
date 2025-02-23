using MediatR;

namespace Commands.Commands.Cars.UpdateCar
{
    public class UpdateCarCommand : IRequest
    {
        public Guid Id { get; set; }
        public string CarSign { get; set; }
        public string? VinCode { get; set; }
        public int Mileage { get; set; }
        public int? Year { get; set; }
        public string? Volume { get; set; }
        public string? Brand { get; set; }
        public string? Model { get; set; }
        public string? AdditionalNotes { get; set; }
    }
}
