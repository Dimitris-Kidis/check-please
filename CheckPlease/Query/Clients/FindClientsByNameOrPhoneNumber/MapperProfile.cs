using ApplicationCore.Domain.Entities;
using AutoMapper;
using Query.Cars.FindCarsByCarSign;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Query.Clients.FindClientsByNameOrPhoneNumber
{
    public class MapperProfile : Profile
    {
        public MapperProfile()
        {
            CreateMap<Client, FindClientsByNameOrPhoneNumberDto>();
            CreateMap<IEnumerable<Client>, IEnumerable<FindClientsByNameOrPhoneNumberDto>>();
        }
    }
}
