using ApplicationCore.Domain.Entities;
using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Query.Clients.GetClientHistory
{
    public class MapperProfile : Profile
    {
        public MapperProfile()
        {
            CreateMap<GetClientHistoryDto, GetClientHistoryDto>();
            CreateMap<IEnumerable<GetClientHistoryDto>, IEnumerable<GetClientHistoryDto>>();
        }
    }
}
