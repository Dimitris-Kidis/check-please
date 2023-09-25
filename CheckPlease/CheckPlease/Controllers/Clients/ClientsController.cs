using AutoMapper;
using CheckPlease.Controllers.Cars.ViewModels;
using CheckPlease.Controllers.Clients.ViewModels;
using Command.Car.CreateCar;
using Command.Clients.CreateClient;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Query.Cars.FindCarsByCarSign;
using Query.Cars.GetAllCars;
using Query.Clients;
using Query.Clients.FindClientsByNameOrPhoneNumber;
using Query.Clients.GetAllClients;
using Query.Clients.GetClientHistory;

namespace CheckPlease.Controllers.Clients
{
    [Route("api/clients")]
    [ApiController]
    public class ClientsController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly IMediator _mediator;
        public ClientsController(IMapper mapper, IMediator mediator)
        {
            _mapper = mapper;
            _mediator = mediator;
        }

        /// <summary>
        /// Create new client
        /// </summary>
        [HttpPost("")]
        public async Task<IActionResult> CreateNewClient([FromBody] CreateClientCommand command)
        {
            var result = await _mediator.Send(command);
            if (result == -1) return BadRequest("There's no client with such id");
            return Ok(result);
        }

        /// <summary>
        /// Get all clients
        /// </summary>
        [HttpGet("all-clients")]
        public async Task<IActionResult> GetAllClients()
        {
            var result = await _mediator.Send(new GetAllClientsQuery());
            if (result == null)
            {
                return BadRequest("Entity is not found");
            }
            return Ok(result.Select(_mapper.Map<GetAllClientsViewModel>));
        }

        /// <summary>
        /// Get client history by car sign
        /// </summary>
        [HttpGet("history")]
        public async Task<IActionResult> GetClientHistoryByCarSign(string carSign)
        {
            var result = await _mediator.Send(new GetClientHistoryQuery { CarSign = carSign });
            if (result == null)
            {
                return BadRequest("Entity is not found");
            }
            return Ok(result.Select(_mapper.Map<GetClientHistoryViewModel>));
        }

        /// <summary>
        /// Find clients by full name or phone number
        /// </summary>
        [HttpGet("find-clients")]
        public async Task<IActionResult> FindClientsByFullnameOrPhoneNumber(string? fullName, string? phoneNumber)
        {
            var result = await _mediator.Send(new FindClientsByNameOrPhoneNumberQuery { Name = fullName, PhoneNumber = phoneNumber });
            if (result == null)
            {
                return BadRequest("Entity is not found");
            }
            return Ok(result.Select(_mapper.Map<FindClientsByNameOrPhoneViewModel>));
        }
    }
}
