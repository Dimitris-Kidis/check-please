using MediatR;
using Queries.DTOs;
using static Common.Enums.LanguageLocaleEnum;
using static Common.Enums.ReportTypeEnum;

namespace Queries.Queries.Repairs.GetReport
{
    public class GetReportQuery : IRequest<ReportDto>
    {
        public ReportType Type { get; set; }
        public LanguageLocale Locale { get; set; }
        public string? CarSign { get; set; }
        public string? PhoneNumber { get; set; }
    }
}
