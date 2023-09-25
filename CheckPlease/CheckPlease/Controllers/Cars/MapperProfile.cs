using AutoMapper;
using CheckPlease.Controllers.Cars.ViewModels;
using Query.Cars.FindCarsByCarSign;
using Query.Cars.GetAllCars;

namespace CheckPlease.Controllers.Cars
{
    public class MapperProfile : Profile
    {
        public MapperProfile()
        {
            CreateMap<GetAllCarsDto, GetAllCarsViewModel>();
            CreateMap<IEnumerable<GetAllCarsDto>, IEnumerable<GetAllCarsViewModel>>();

            CreateMap<FindCarsByCarSignDto, FindCarsByCarSignViewModel>();
            CreateMap<IEnumerable<FindCarsByCarSignDto>, IEnumerable<FindCarsByCarSignViewModel>>();
        }
    }
}
