using AutoMapper;
using CheckPlease.Controllers.Cars.ViewModels;
using Query.Cars.GetAllCars;
using Query.Clients.FindClientsByNameOrPhoneNumber;
using Query.Clients.GetAllClients;
using Query.Clients.GetClientHistory;

namespace CheckPlease.Controllers.Clients.ViewModels
{
    public class MapperProfile : Profile
    {
        public MapperProfile()
        {
            CreateMap<GetAllClientsDto, GetAllClientsViewModel>();
            CreateMap<IEnumerable<GetAllClientsDto>, IEnumerable<GetAllClientsViewModel>>();

            CreateMap<GetClientHistoryDto, GetClientHistoryViewModel>();
            CreateMap<IEnumerable<GetClientHistoryDto>, IEnumerable<GetClientHistoryViewModel>>();

            CreateMap<FindClientsByNameOrPhoneNumberDto, FindClientsByNameOrPhoneViewModel>();
            CreateMap<IEnumerable<FindClientsByNameOrPhoneNumberDto>, IEnumerable<FindClientsByNameOrPhoneViewModel>>();
        }
    }
}
