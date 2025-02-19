using MediatR;
using Microsoft.AspNetCore.Mvc;
using Queries.Queries.General.GetGeneralInformation;

namespace CheckPlease.Controllers.Common
{
    [Route("api/common")]
    [ApiController]
    public class CommonController(IMediator mediator) : ControllerBase
    {
        private readonly IMediator _mediator = mediator;

        /// <summary>
        /// Get common info
        /// </summary>
        [HttpGet("")]
        public async Task<IActionResult> GetMainPageInfo()
        {
            var result = await _mediator.Send(new GetGeneralInformationQuery());

            return Ok(result);
        }
    }
}
