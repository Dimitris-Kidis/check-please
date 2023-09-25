using AutoMapper;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.StaticFiles;
using Query.History.GetExcelFile;
using Query.Repairs.GetCheckPrint;

namespace CheckPlease.Controllers.Prints
{
    [Route("api/prints")]
    [ApiController]
    public class PrintsController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly IMediator _mediator;
        public PrintsController(IMapper mapper, IMediator mediator)
        {
            _mapper = mapper;
            _mediator = mediator;
        }

        /// <summary>
        /// Get check print
        /// </summary>
        [HttpGet]
        public async Task<IActionResult> GetCheckPrint(int repairId)

        {
            var result = await _mediator.Send(new GetCheckPrintQuery { RepairId = repairId });
            if (result == null)
            {
                return BadRequest("Entity is not found");
            }
            string fileName = @$"{DateTime.Now}.pdf";
            new FileExtensionContentTypeProvider().TryGetContentType(fileName, out string type);
            return File(result, type, fileName);
        }

        /// <summary>
        /// Get excel file
        /// </summary>
        [HttpGet("excel")]
        public async Task<IActionResult> GetExcelFile()
        {
            var result = await _mediator.Send(new GetExcelFileQuery());
            return (IActionResult)result;
        }
    }
}
