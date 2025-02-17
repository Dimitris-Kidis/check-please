using MediatR;
using Queries.DTOs;

namespace Queries.Queries.Cars.GetCarSuggestionsByPhoneNumber
{
    public class GetCarSuggestionsByPhoneNumberQuery : IRequest<IEnumerable<CarDto>>
    {
        public string PhoneNumber { get; set; }
    }
}
