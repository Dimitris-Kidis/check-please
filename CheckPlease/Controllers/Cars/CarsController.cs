using Commands.Commands.Cars.CreateCar;
using Commands.Commands.Cars.DeleteCar;
using Commands.Commands.Cars.UpdateCar;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Queries.Queries.Cars.GetCar;
using Queries.Queries.Cars.GetCarHistory;
using Queries.Queries.Cars.GetCarSearchPaginated;
using Queries.Queries.Cars.GetCarSuggestionsByPhoneNumber;

namespace CheckPlease.Controllers.Cars
{
    [Route("api/cars")]
    [ApiController]
    public class CarsController(IMediator mediator) : ControllerBase
    {
        private readonly IMediator _mediator = mediator;

        /// <summary>
        /// Create new car
        /// </summary>
        [HttpPost("")]
        public async Task<IActionResult> CreateNewCar([FromBody] CreateCarCommand command)
        {
            var result = await _mediator.Send(command);

            return Ok(result);
        }

        /// <summary>
        /// Delete car
        /// </summary>
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCar(Guid id)
        {
            await _mediator.Send(new DeleteCarCommand { Id = id });
            return Ok();
        }

        /// <summary>
        /// Update car
        /// </summary>
        [HttpPut("")]
        public async Task<IActionResult> UpdateCar([FromBody] UpdateCarCommand command)
        {
            await _mediator.Send(command);
            return NoContent();
        }

        /// <summary>
        /// Get car
        /// </summary>
        [HttpGet("{id}")]
        public async Task<IActionResult> GetCar(Guid id)
        {
            var result = await _mediator.Send(new GetCarQuery { Id = id });

            return Ok(result);
        }

        /// <summary>
        /// Get car search paginated
        /// </summary>
        [HttpPost("paginated")]
        public async Task<IActionResult> GetCarSearchPaginated([FromBody] GetCarSearchPaginatedQuery query)
        {
            var result = await _mediator.Send(query);

            return Ok(result);
        }

        /// <summary>
        /// Get car suggestions by phone number
        /// </summary>
        [HttpPost("suggestions")]
        public async Task<IActionResult> GetCarSuggestionsByPhoneNumber([FromBody] GetCarSuggestionsByPhoneNumberQuery query)
        {
            var result = await _mediator.Send(query);

            return Ok(result);
        }

        /// <summary>
        /// Get car history
        /// </summary>
        [HttpGet("history/{id}")]
        public async Task<IActionResult> GetCarHistory(Guid id)
        {
            var result = await _mediator.Send(new GetCarHistoryQuery { Id = id });

            return Ok(result);
        }
    }
}
