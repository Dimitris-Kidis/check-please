using AutoMapper;
using Commands.Commands.Clients.CreateClient;
using Commands.Commands.Clients.UpdateClient;
using Core.Domain.Entities;

namespace Commands.MapperProfiles
{
    public class ClientProfile : Profile
    {
        public ClientProfile()
        {
            CreateMap<CreateClientCommand, Client>();
            CreateMap<UpdateClientCommand, Client>();
        }
    }
}
