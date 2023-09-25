using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Command.Car.UpdateCar
{
    public class UpdateCarMileageCommand : IRequest<int>
    {
        public int CarId { get; set; }
        public int Mileage { get; set; }
    }
}
