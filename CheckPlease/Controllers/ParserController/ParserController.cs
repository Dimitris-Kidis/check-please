using AutoMapper;
using Commands.Commands.Parser.RestoreDbDataByParsedData;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Parser.Data;
using Parser.Parser;

namespace CheckPlease.Controllers.ParserController
{
    [Route("api/parser")]
    [ApiController]
    public class ParserController(IMediator mediator, IMapper mapper) : ControllerBase
    {
        private readonly IMediator _mediator = mediator;
        private readonly IMapper mapper = mapper;

        /// <summary>
        /// Populate DB
        /// </summary>
        [HttpGet("populate-db")]
        public async Task<IActionResult> PopulateDb()
        {
            List<ParsedRepairData> data = RepairDataParser.ParseFromFile();

            foreach (var item in data)
            {
                var command = mapper.Map<RestoreDbDataByParsedDataCommand>(item);
                await _mediator.Send(command);
            }

            return Ok();
        }
    }
}