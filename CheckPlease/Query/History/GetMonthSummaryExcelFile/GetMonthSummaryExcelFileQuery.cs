using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Query.History.GetMonthSummaryExcelFile
{
    public class GetMonthSummaryExcelFileQuery : IRequest<Microsoft.AspNetCore.Mvc.FileStreamResult>
    {
    }
}
