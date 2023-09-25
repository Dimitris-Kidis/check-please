using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Query.Cars.GetAllCars
{
    public class GetAllCarsQuery : IRequest<IEnumerable<GetAllCarsDto>>
    {
    }
}
