using AutoMapper;
using CheckPlease.Controllers.Cars.ViewModels;
using CheckPlease.Controllers.Clients.ViewModels;
using Command.Car.CreateCar;
using Command.Car.UpdateCar;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Query.Cars.FindCarsByCarSign;
using Query.Cars.GetAllCars;
using Query.Clients.GetClientHistory;

namespace CheckPlease.Controllers.Cars
{
    [Route("api/cars")]
    [ApiController]
    public class CarsController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly IMediator _mediator;
        public CarsController(IMapper mapper, IMediator mediator)
        {
            _mapper = mapper;
            _mediator = mediator;
        }

        /// <summary>
        /// Create new car
        /// </summary>
        [HttpPost("")]
        public async Task<IActionResult> CreateNewCar([FromBody] CreateCarCommand command)
        {
            var result = await _mediator.Send(command);
            if (result == -1) return BadRequest("There's no car with such id");
            return Ok(result);
        }

        /// <summary>
        /// Update car mileage by car id
        /// </summary>
        [HttpPut("car")]
        public async Task<IActionResult> UpdateCarMileage([FromBody] UpdateCarMileageCommand command)
        {
            var result = await _mediator.Send(command);
            if (result == -1) return NotFound("There's no student with such id");
            return NoContent();
        }

        /// <summary>
        /// Get all cars
        /// </summary>
        [HttpGet("all-cars")]
        public async Task<IActionResult> GetAllCars()
        {
            var result = await _mediator.Send(new GetAllCarsQuery());
            if (result == null)
            {
                return BadRequest("Entity is not found");
            }
            return Ok(result.Select(_mapper.Map<GetAllCarsViewModel>));
        }

        /// <summary>
        /// Find cars by car sign
        /// </summary>
        [HttpGet("find-cars")]
        public async Task<IActionResult> FindCarsByCarSign(string carSign)
        {
            var result = await _mediator.Send(new FindCarsByCarSignQuery { CarSign = carSign });
            if (result == null)
            {
                return BadRequest("Entity is not found");
            }
            return Ok(result.Select(_mapper.Map<FindCarsByCarSignViewModel>));
        }
    }
}
