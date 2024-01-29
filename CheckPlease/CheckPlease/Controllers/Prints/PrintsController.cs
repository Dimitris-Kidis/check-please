using ApplicationCore.Domain.Entities;
using ApplicationCore.Services.Repository.CheckRepository;
using AutoMapper;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.StaticFiles;
using Microsoft.EntityFrameworkCore;
using Query.History.GetExcelFile;
using Query.History.GetMonthSummaryExcelFile;
using Query.Repairs.GetCheckPrint;
using System.Data.Entity.Core.Objects;

namespace CheckPlease.Controllers.Prints
{
    [Route("api/prints")]
    [ApiController]
    public class PrintsController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly IMediator _mediator;
        private readonly ICheckRepository<Repair> _repairsRepository;
        private readonly ICheckRepository<Detail> _detailsRepository;

        public PrintsController(
            IMapper mapper,
            IMediator mediator,
            ICheckRepository<Repair> repairsRepository,
            ICheckRepository<Detail> detailsRepository)
        {
            _mapper = mapper;
            _mediator = mediator;
            _repairsRepository = repairsRepository;
            _detailsRepository = detailsRepository;
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

            var today = DateTimeOffset.Now.Date;
            var todayCarOrder = _repairsRepository.FindBy(repair => repair.CreatedAt.Date == today).Count();

            var total = 0;
            var detailsInfoForTable = _detailsRepository
                .FindBy(detail => detail.RepairId == repairId)
                .ToList();
            for (int i = 0; i < detailsInfoForTable.Count; i++)
            {
                total += detailsInfoForTable[i].RepairPrice + (detailsInfoForTable[i].PricePerOne * detailsInfoForTable[i].Quantity) ?? 0;
            }

            var repairCheck = _repairsRepository
                .GetAll()
                .Include(repair => repair.Car)
                .Where(repair => repair.Id == repairId)
                .Select(repair => new
                {
                    repair.Car.CarSign,
                    CarOrder = todayCarOrder
                }).FirstOrDefault();

            //List<int> sums = { 20, 50 };
            //int[] array = new int { 20, 50 };
            int[] payments = { 20, 50 };
            var sumToPay = total <= 300 ? payments[0] : payments[1];

            string fileName = @$"({repairCheck.CarOrder}) [{sumToPay}] {repairCheck.CarSign} {DateTime.Now.ToString("dd/MM/yyyy HH:mm")}.pdf";
            new FileExtensionContentTypeProvider().TryGetContentType(fileName, out string type);
            return File(result, type, fileName);
        }

        /// <summary>
        /// Get excel file with info
        /// </summary>
        [HttpGet("excel")]
        public async Task<IActionResult> GetExcelFile()
        {
            var result = await _mediator.Send(new GetExcelFileQuery());
            return (IActionResult)result;
        }

        /// <summary>
        /// Get month summary excel file
        /// </summary>
        [HttpGet("excel/summary")]
        public async Task<IActionResult> GetMonthSummaryExcelFile()
        {
            var result = await _mediator.Send(new GetMonthSummaryExcelFileQuery());
            return (IActionResult)result;
        }
    }
}
