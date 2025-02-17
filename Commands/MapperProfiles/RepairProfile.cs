using AutoMapper;
using Commands.Commands.Repairs.CreateRepair;
using Commands.Commands.Repairs.UpdateRepair;
using Core.Domain.Entities;

namespace Commands.MapperProfiles
{
    public class RepairProfile : Profile
    {
        public RepairProfile()
        {
            CreateMap<CreateRepairCommand, Repair>();
            CreateMap<CreateDetailCommand, Detail>();

            CreateMap<UpdateRepairCommand, Repair>()
                .ForMember(dest => dest.Details, opt => opt.Ignore());
            CreateMap<UpdateDetailCommand, Detail>();
        }
    }
}
