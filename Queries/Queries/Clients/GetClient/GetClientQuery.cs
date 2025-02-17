using MediatR;
using Queries.DTOs;

namespace Queries.Queries.Clients.GetClient
{
    public class GetClientQuery : IRequest<ClientDto>
    {
        public Guid Id { get; set; }
    }
}
