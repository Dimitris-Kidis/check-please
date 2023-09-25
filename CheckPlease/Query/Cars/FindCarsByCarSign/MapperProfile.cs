using ApplicationCore.Domain.Entities;
using AutoMapper;
using Query.Cars.GetAllCars;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Query.Cars.FindCarsByCarSign
{
    public class MapperProfile : Profile
    {
        public MapperProfile()
        {
            CreateMap<Car, FindCarsByCarSignDto>();
            CreateMap<IEnumerable<Car>, IEnumerable<FindCarsByCarSignDto>>();
        }
    }
}
