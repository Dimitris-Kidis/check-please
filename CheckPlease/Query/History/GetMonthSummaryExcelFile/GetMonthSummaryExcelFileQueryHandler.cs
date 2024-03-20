using ApplicationCore.Domain.Entities;
using ApplicationCore.Services.Repository.CheckRepository;
using AutoMapper;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using OfficeOpenXml;
using Query.History.GetExcelFile;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Query.History.GetMonthSummaryExcelFile
{
    public class GetMonthSummaryExcelFileQueryHandler : IRequestHandler<GetMonthSummaryExcelFileQuery, Microsoft.AspNetCore.Mvc.FileStreamResult>
    {
        private readonly ICheckRepository<Client> _clientsRepository;
        private readonly ICheckRepository<Car> _carsRepository;
        private readonly ICheckRepository<Repair> _repairsRepository;
        private readonly IMapper _mapper;

        public GetMonthSummaryExcelFileQueryHandler(
            ICheckRepository<Client> clientsRepository,
            ICheckRepository<Car> carsRepository,
            ICheckRepository<Repair> repairsRepository,
            IMapper mapper)
        {
            _clientsRepository = clientsRepository;
            _carsRepository = carsRepository;
            _repairsRepository = repairsRepository;
            _mapper = mapper;
        }

        public async Task<FileStreamResult> Handle(GetMonthSummaryExcelFileQuery request, CancellationToken cancellationToken)
        {
            string currentDate = DateTime.Now.ToString("dd.MM.yyyy");

            int currentMonth = DateTime.Now.Month;
            int currentYear = DateTime.Now.Year;

            var newCarsThisMonth = _carsRepository.FindBy(x => x.CreatedAt.Month == currentMonth && x.CreatedAt.Year == currentYear).Count();
            var newClientsThisMonth = _clientsRepository.FindBy(x => x.CreatedAt.Month == currentMonth && x.CreatedAt.Year == currentYear).Count();
            var newRepairsThisMonth = _repairsRepository.FindBy(x => x.CreatedAt.Month == currentMonth && x.CreatedAt.Year == currentYear).Count();

            var earnedThisMonth = _repairsRepository
                .FindBy(x => x.CreatedAt.Month == currentMonth && x.CreatedAt.Year == currentYear)
                .Sum(x => x.TotalRepairPrice);

            var earnedByAccountant = _repairsRepository
                .FindBy(x => x.CreatedAt.Month == currentMonth && x.CreatedAt.Year == currentYear)
                .Select(x => x.TotalRepairPrice <= 300 ? 20 : 50)
                .Sum();

            ExcelPackage.LicenseContext = LicenseContext.NonCommercial;

            using (var package = new ExcelPackage())
            {
                var worksheetRepairs = package.Workbook.Worksheets.Add($"{currentDate}");

                worksheetRepairs.Cells["A1"].Value = "Новых машин в БД в этом месяце";
                worksheetRepairs.Cells["B1"].Value = newCarsThisMonth;

                worksheetRepairs.Cells["A2"].Value = "Новых клиентов в БД в этом месяце";
                worksheetRepairs.Cells["B2"].Value = newClientsThisMonth;

                worksheetRepairs.Cells["A3"].Value = "Новых ремонтов в БД в этом месяце";
                worksheetRepairs.Cells["B3"].Value = newRepairsThisMonth;

                worksheetRepairs.Cells["A4"].Value = "Заработано в этом месяце";
                worksheetRepairs.Cells["B4"].Value = earnedThisMonth;

                worksheetRepairs.Cells["A5"].Value = "Заработано в этом месяце помощником";
                worksheetRepairs.Cells["B5"].Value = earnedByAccountant;

                worksheetRepairs.Column(1).Style.Font.Bold = true;
                worksheetRepairs.Column(1).Style.Font.Size = 14;

                worksheetRepairs.Column(1).AutoFit();
                worksheetRepairs.Column(2).AutoFit();

                var stream = new MemoryStream();
                package.SaveAs(stream);

                stream.Position = 0;
                string excelName = $"Finance on {DateTime.Now.ToString("dd/MM/yyyy")}";

                return new FileStreamResult(stream, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")
                {
                    FileDownloadName = excelName,
                };
            }
        }
    }
}
