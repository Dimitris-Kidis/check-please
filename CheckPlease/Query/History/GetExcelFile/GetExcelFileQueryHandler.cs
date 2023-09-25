using ApplicationCore.Domain.Entities;
using ApplicationCore.Services.Repository.CheckRepository;
using AutoMapper;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using OfficeOpenXml;
using Query.Clients.GetClientHistory;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Query.History.GetExcelFile
{
    public class GetExcelFileQueryHandler : IRequestHandler<GetExcelFileQuery, Microsoft.AspNetCore.Mvc.FileStreamResult>
    {
        private readonly ICheckRepository<Client> _clientsRepository;
        private readonly ICheckRepository<Car> _carsRepository;
        private readonly ICheckRepository<Repair> _repairsRepository;
        private readonly IMapper _mapper;

        public GetExcelFileQueryHandler(
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

        public async Task<FileStreamResult> Handle(GetExcelFileQuery request, CancellationToken cancellationToken)
        {
            var allInfo = await _repairsRepository
                .GetAll()
                .Include(repair => repair.Car)
                .Include(repair => repair.Details)
                .Include(repair => repair.Client)
                .Select(excel => new
                {
                    FullName = excel.Client.FullName,
                    PhoneNumber = excel.Client.PhoneNumber,
                    Age = excel.Client.Age,
                    JobTitle = excel.Client.JobTitle,
                    CarSign = excel.Car.CarSign,
                    VinCode = excel.Car.VinCode,
                    Mileage = excel.Mileage,
                    Year = excel.Car.Year,
                    Volume = excel.Car.Volume,
                    Brand = excel.Car.Brand,
                    Model = excel.Car.Model,
                    RepairationDate = excel.CreatedAt,
                    Problems = excel.Problems,
                    Details = excel.Details.Select(detail => new
                    {
                        DetailName = detail.DetailName,
                        PricePerOne = detail.PricePerOne,
                        Quantity = detail.Quantity,
                        DetailsPrice = ((detail.PricePerOne ?? 0) * (detail.Quantity ?? 0)),
                        RepairPrice = detail.RepairPrice,
                        TotalPrice = ((detail.PricePerOne ?? 0) * (detail.Quantity ?? 0)) + detail.RepairPrice
                    }).ToList()
                }).ToListAsync();

            var clientsAndCars = await _repairsRepository
                .GetAll()
                .Include(repair => repair.Car)
                .Include(repair => repair.Client)
                .Select(excel => new
                {
                    FullName = excel.Client.FullName,
                    PhoneNumber = excel.Client.PhoneNumber,
                    CarSign = excel.Car.CarSign
                }).ToListAsync();



            ExcelPackage.LicenseContext = LicenseContext.NonCommercial;

            using (var package = new ExcelPackage())
            {
                var worksheetRepairs = package.Workbook.Worksheets.Add("Все ремонты");
                worksheetRepairs.Cells.LoadFromCollection(allInfo, true);

                var worksheetUsersAndCars = package.Workbook.Worksheets.Add("Клиенты");
                worksheetUsersAndCars.Cells.LoadFromCollection(clientsAndCars, true);

                worksheetRepairs.Row(1).Style.Font.Bold = true;
                worksheetRepairs.Row(1).Style.Font.Size = 16;

                worksheetUsersAndCars.Column(1).AutoFit();
                worksheetUsersAndCars.Column(2).AutoFit();
                worksheetUsersAndCars.Column(3).AutoFit();

                worksheetUsersAndCars.Row(1).Style.Font.Bold = true;
                worksheetUsersAndCars.Row(1).Style.Font.Size = 16;

                var stream = new MemoryStream();
                package.SaveAs(stream);

                

                stream.Position = 0;
                string excelName = $"Database on {DateTime.Now.ToString("dd/MM/yyyy")}";

                return new FileStreamResult(stream, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")
                {
                    FileDownloadName = excelName,
                };
            }
        }
    }
}
