using AutoMapper;
using Commands.Commands.Parser.RestoreDbDataByParsedData;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Parser.Data;
using Parser.Parser;
using Queries.Queries.Parser.GetRepairsBackup;

namespace CheckPlease.Controllers.Parser
{
    [Route("api/parser")]
    [ApiController]
    public class ParserController(IMediator mediator, IMapper mapper, IConfiguration configuration) : ControllerBase
    {
        private readonly IMediator _mediator = mediator;
        private readonly IMapper mapper = mapper;
        private readonly IConfiguration configuration = configuration;

        /// <summary>
        /// Populate DB
        /// </summary>
        [HttpGet("populate-db")]
        public async Task<IActionResult> PopulateDb()
        {
            string filePath = configuration.GetConnectionString("filePathToRestoreFrom");
            List<ParsedRepairData> data = RepairDataParser.ParseFromFile(filePath);

            foreach (var item in data)
            {
                var command = mapper.Map<RestoreDbDataByParsedDataCommand>(item);
                await _mediator.Send(command);
            }

            return Ok();
        }

        /// <summary>
        /// Create backup
        /// </summary>
        [HttpGet("backup")]
        public async Task<IActionResult> CreateBackup()
        {
            await _mediator.Send(new GetRepairsBackupQuery());

            return Ok();
        }
    }
}