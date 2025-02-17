using Commands.Commands.Repairs.CreateRepair;
using Commands.Commands.Repairs.DeleteRepair;
using Commands.Commands.Repairs.UpdateRepair;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Queries.Queries.Repairs.GetHistorySearchPaginated;
using Queries.Queries.Repairs.GetRepair;
using Queries.Queries.Repairs.GetRepairCheck;

namespace CheckPlease.Controllers.Repairs
{
    [Route("api/repairs")]
    [ApiController]
    public class RepairsController(IMediator mediator) : ControllerBase
    {
        private readonly IMediator _mediator = mediator;

        /// <summary>
        /// Create new repair
        /// </summary>
        [HttpPost("")]
        public async Task<IActionResult> CreateNewRepair([FromBody] CreateRepairCommand command)
        {
            var result = await _mediator.Send(command);

            return Ok(result);
        }

        /// <summary>
        /// Delete repair
        /// </summary>
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteRepair(Guid id)
        {
            await _mediator.Send(new DeleteRepairCommand { Id = id });
            return Ok();
        }

        /// <summary>
        /// Update repair
        /// </summary>
        [HttpPut("")]
        public async Task<IActionResult> UpdateRepair([FromBody] UpdateRepairCommand command)
        {
            await _mediator.Send(command);
            return NoContent();
        }

        /// <summary>
        /// Get repair
        /// </summary>
        [HttpGet("{id}")]
        public async Task<IActionResult> GetRepair(Guid id)
        {
            var result = await _mediator.Send(new GetRepairQuery { Id = id });

            return Ok(result);
        }

        /// <summary>
        /// Get history search paginated
        /// </summary>
        [HttpPost("history")]
        public async Task<IActionResult> GetHistorySearchPaginated([FromBody] GetHistorySearchPaginatedQuery query)
        {
            var result = await _mediator.Send(query);

            return Ok(result);
        }

        /// <summary>
        /// Get check print
        /// </summary>
        [HttpGet("print/{id}")]
        public async Task<IActionResult> GetCheckPrint(Guid id)
        {
            var result = await _mediator.Send(new GetRepairCheckQuery { Id = id });

            return File(result.FileStream, result.ContentType, result.FileName);
        }
    }
}
