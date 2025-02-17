using MediatR;
using Queries.DTOs;

namespace Queries.Queries.Clients.GetClientsSuggestionsByCarSign
{
    public class GetClientsSuggestionsByCarSignQuery : IRequest<IEnumerable<ClientDto>>
    {
        public string CarSign { get; set; }
    }
}
