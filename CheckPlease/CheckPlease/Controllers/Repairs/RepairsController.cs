using AutoMapper;
using Command.Car.CreateCar;
using Command.Repair.CreateRepair;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace CheckPlease.Controllers.Repairs
{
    [Route("api/repairs")]
    [ApiController]
    public class RepairsController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly IMediator _mediator;
        public RepairsController(IMapper mapper, IMediator mediator)
        {
            _mapper = mapper;
            _mediator = mediator;
        }

        /// <summary>
        /// Create new repair
        /// </summary>
        [HttpPost("")]
        public async Task<IActionResult> CreateNewRepair([FromBody] CreateRepairCommand command)
        {
            var result = await _mediator.Send(command);
            if (result == -1) return BadRequest("There's no repair with such id");
            return Ok(result);
        }
    }
}
