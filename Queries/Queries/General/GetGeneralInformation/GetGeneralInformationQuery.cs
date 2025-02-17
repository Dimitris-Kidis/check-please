using MediatR;
using Queries.DTOs;

namespace Queries.Queries.General.GetGeneralInformation
{
    public class GetGeneralInformationQuery : IRequest<GeneralInformationDto> { }
}
