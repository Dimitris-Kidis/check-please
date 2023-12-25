using ApplicationCore.Domain.Entities;
using AutoMapper;
using OfficeOpenXml.Drawing.Chart;
using Query.Cars.GetAllCars;
using Query.Clients.GetClientHistory;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Query.Repairs.GetRepairs
{
    public class MapperProfile : Profile
    {
        public MapperProfile()
        {
            CreateMap<GetAllCarsDto, GetAllCarsDto>();
            CreateMap<IEnumerable<GetAllCarsDto>, IEnumerable<GetAllCarsDto>>();

            CreateMap<Detail, DetailInfo>();

            CreateMap<Repair, GetRepairsDto?>()
                .ForMember(x => x.Id, opt => opt.MapFrom(x => x.Id))
                .ForMember(x => x.Date, opt => opt.MapFrom(x => x.CreatedAt))
                .ForMember(x => x.CarSign, opt => opt.MapFrom(x => x.Car.CarSign))
                .ForMember(x => x.Mileage, opt => opt.MapFrom(x => x.Car.Mileage))
                .ForMember(x => x.Details, opt => opt.MapFrom(x => x.Details));
        }
    }
}
