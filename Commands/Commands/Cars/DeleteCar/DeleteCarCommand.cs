using MediatR;

namespace Commands.Commands.Cars.DeleteCar
{
    public class DeleteCarCommand : IRequest
    {
        public Guid Id { get; set; }
    }
}
