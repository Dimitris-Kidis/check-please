using MediatR;
using Queries.DTOs;
using static Common.Enums.LanguageLocaleEnum;

namespace Queries.Queries.Repairs.GetRepairCheck
{
    public class GetRepairCheckQuery : IRequest<FileDto>
    {
        public Guid Id { get; set; }
        public LanguageLocale? Locale { get; set; }
    }
}
