using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Query.Cars.FindCarsByCarSign
{
    public class FindCarsByCarSignDto
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
