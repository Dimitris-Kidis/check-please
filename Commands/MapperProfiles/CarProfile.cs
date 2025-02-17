using AutoMapper;
using Commands.Commands.Cars.CreateCar;
using Commands.Commands.Cars.UpdateCar;
using Core.Domain.Entities;

namespace Commands.MapperProfiles
{
    public class CarProfile : Profile
    {
        public CarProfile()
        {
            CreateMap<CreateCarCommand, Car>();
            CreateMap<UpdateCarCommand, Car>();
        }
    }
}
