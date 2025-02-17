using MediatR;
using Queries.DTOs;

namespace Queries.Queries.Cars.GetCar
{
    public class GetCarQuery : IRequest<CarDto>
    {
        public Guid Id { get; set; }
    }
}
