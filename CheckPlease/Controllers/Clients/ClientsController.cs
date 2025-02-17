using Commands.Commands.Clients.CreateClient;
using Commands.Commands.Clients.DeleteClient;
using Commands.Commands.Clients.UpdateClient;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Queries.Queries.Clients.GetClient;
using Queries.Queries.Clients.GetClientSearchPaginated;
using Queries.Queries.Clients.GetClientsSuggestionsByCarSign;

namespace CheckPlease.Controllers.Clients
{
    [Route("api/clients")]
    [ApiController]
    public class ClientsController(IMediator mediator) : ControllerBase
    {
        private readonly IMediator _mediator = mediator;

        /// <summary>
        /// Create new client
        /// </summary>
        [HttpPost("")]
        public async Task<IActionResult> CreateNewClient([FromBody] CreateClientCommand command)
        {
            var result = await _mediator.Send(command);

            return Ok(result);
        }

        /// <summary>
        /// Delete client
        /// </summary>
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteClient(Guid id)
        {
            await _mediator.Send(new DeleteClientCommand { Id = id });
            return Ok();
        }

        /// <summary>
        /// Update client
        /// </summary>
        [HttpPut("")]
        public async Task<IActionResult> UpdateClient([FromBody] UpdateClientCommand command)
        {
            await _mediator.Send(command);
            return NoContent();
        }

        /// <summary>
        /// Get client
        /// </summary>
        [HttpGet("{id}")]
        public async Task<IActionResult> GetClient(Guid id)
        {
            var result = await _mediator.Send(new GetClientQuery { Id = id });

            return Ok(result);
        }

        /// <summary>
        /// Get client search paginated
        /// </summary>
        [HttpPost("paginated")]
        public async Task<IActionResult> GetClientsSearchPaginated([FromBody] GetClientSearchPaginatedQuery query)
        {
            var result = await _mediator.Send(query);

            return Ok(result);
        }

        /// <summary>
        /// Get clients suggestions by car sign
        /// </summary>
        [HttpPost("suggestions")]
        public async Task<IActionResult> GetClientsSuggestionsByCarSign([FromBody] GetClientsSuggestionsByCarSignQuery query)
        {
            var result = await _mediator.Send(query);

            return Ok(result);
        }
    }
}
