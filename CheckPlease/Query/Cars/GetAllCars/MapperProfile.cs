using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Query.Cars.GetAllCars
{
    public class MapperProfile : Profile
    {
        public MapperProfile()
        {
            CreateMap<GetAllCarsDto, GetAllCarsDto>();
            CreateMap<IEnumerable<GetAllCarsDto>, IEnumerable<GetAllCarsDto>>();
        }
    }
}
