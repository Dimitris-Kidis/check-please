using ApplicationCore.Domain.Entities;
using AutoMapper;
using MediatR;
using System.Globalization;
using HandlebarsDotNet;
using Wkhtmltopdf.NetCore;
using WkhtmlDriver = Wkhtmltopdf.NetCore.WkhtmlDriver;
using ApplicationCore.Services.Repository.CheckRepository;
using Microsoft.EntityFrameworkCore;

namespace Query.Repairs.GetCheckPrint
{
    public class GetCheckPrintQueryHandler : IRequestHandler<GetCheckPrintQuery, Stream>
    {
        private readonly ICheckRepository<Car> _carsRepository;
        private readonly ICheckRepository<Client> _clientsRepository;
        private readonly ICheckRepository<Repair> _repairsRepository;
        private readonly ICheckRepository<Detail> _detailsRepository;
        private readonly IMapper _mapper;

        private string _htmlTemplate = @"
        <html>
            <head>
                <style>
                    .header {
                    }

                    .header-element {
                        font-weight: 800;
                    }
                    
                    .right {
                        text-align: right;
                    }

                    .left {
                        text-align: left;
                    }
                </style>
            </head>
            <body>
                <div class='header'>
                    <div class='header-element'>Мастер: Сергей Романенко</div>
                    <div class='header-element'>Номер телефона: 0 (686) 999 31</div>
                </div>
               <hr>
                <div class='header'>
                    <div class='header-element'>Клиент: {{ FullName }}</div>
                    <div class='header-element'>Номер телефона: {{ PhoneNumber }}</div>
                </div>
                <hr>
                <div class='header'>
                    <div class='header-element'>Номер машины: {{ CarSign }} | Vin-code: {{ VinCode }}</div>
                    <div class='header-element'>Машина: {{ Brand }} {{ Model }} ({{ Year }}, {{ Volume }})</div>
                    <div class='header-element'>Пробег в день ремонта: {{ Mileage }}</div>
                </div>
                <hr>";

        private string _problemsTemplate = @"";
        private string _detailsTemplate = @"";
        private string _endTemplate = @"";
        private string _tailTemplate = @"
            </body>
        </html>"
        ;
        public GetCheckPrintQueryHandler(
            ICheckRepository<Car> carsRepository,
            ICheckRepository<Client> clientsRepository,
            ICheckRepository<Repair> repairsRepository,
            ICheckRepository<Detail> detailsRepository,
            IMapper mapper)
        {
            _carsRepository = carsRepository;
            _clientsRepository = clientsRepository;
            _repairsRepository = repairsRepository;
            _detailsRepository = detailsRepository;
            _mapper = mapper;
        }

        public async Task<Stream> Handle(GetCheckPrintQuery request, CancellationToken cancellationToken)
        {


            var repairCheck = _repairsRepository
                .GetAll()
                .Include(repair => repair.Car)
                .Include(repair => repair.Details)
                .Include(repair => repair.Client)
                .Where(repair => repair.Id == request.RepairId)
                .Select(check => new CheckPrintDto
                {
                    FullName = check.Client.FullName,
                    PhoneNumber = check.Client.PhoneNumber,
                    CarSign = check.Car.CarSign,
                    Volume = check.Car.Volume,
                    Brand = check.Car.Brand,
                    Mileage = check.Car.Mileage,
                    Model = check.Car.Model,
                    Year = check.Car.Year,
                    VinCode = check.Car.VinCode,
                    RepairDate = check.CreatedAt
                }).FirstOrDefault();

            var hasProblems = _repairsRepository.FindBy(repair => repair.Id == request.RepairId).FirstOrDefault().Problems == null ? false : true;

            if (hasProblems)
            {
                _problemsTemplate = @$"
                <div class='header'>
                    <div class='header-element'>Проблемы: {_repairsRepository.FindBy(repair => repair.Id == request.RepairId).FirstOrDefault().Problems}</div
                </div>
                <hr>
                ";
                _htmlTemplate += _problemsTemplate;
            }

            var detailsInfoForTable = _detailsRepository
                .FindBy(detail => detail.RepairId == request.RepairId)
                .ToList();

            _detailsTemplate += @"
                <table style='margin-top: 40px; margin-bottom: 20px; border-collapse: collapse; width: 100%;' border='1px'>
                <tr>
                    <th style='padding: 4px;'>Запчасть / Услуга</th>
                    <th style='padding: 4px;'>Цена 1 шт.</th>
                    <th style='padding: 4px;'>Количество</th>
                    <th style='padding: 4px;'>Общая цена запчасти</th>
                    <th style='padding: 4px;'>Цена работы</th>
                    <th style='padding: 4px;'>Общая цена</th>
                </tr>
            ";
            var detailPrice = 0;
            var repairPrice = 0;
            var total = 0;
            for (int i = 0; i < detailsInfoForTable.Count(); i++)
            {
                _detailsTemplate += $@"
                    <tr>  
                        <td style='text-align: center;'>{detailsInfoForTable[i].DetailName}</td>
                        <td style='text-align: center;'>{detailsInfoForTable[i].PricePerOne}</td>
                        <td style='text-align: center;'>{detailsInfoForTable[i].Quantity}</td>
                        <td style='text-align: center;'>{detailsInfoForTable[i].PricePerOne * detailsInfoForTable[i].Quantity}</td>
                        <td style='text-align: center;'>{detailsInfoForTable[i].RepairPrice}</td>
                        <td style='text-align: center;'>{detailsInfoForTable[i].RepairPrice + (detailsInfoForTable[i].PricePerOne * detailsInfoForTable[i].Quantity)}</td>
                    </tr>  
                ";
                detailPrice += detailsInfoForTable[i].PricePerOne * detailsInfoForTable[i].Quantity ?? 0;
                repairPrice += detailsInfoForTable[i].RepairPrice;
                total += detailsInfoForTable[i].RepairPrice + (detailsInfoForTable[i].PricePerOne * detailsInfoForTable[i].Quantity) ?? 0;
            }
            _detailsTemplate += $@"
                    <table style='margin-top: 40px; margin-bottom: 20px; border-collapse: collapse; width: 100%;' border='1px'>
                        <tr>  
                            <td style='text-align: center;'>Общая цена запчастей: {detailPrice}</td>
                            <td style='text-align: center;'>Общая цена работы: {repairPrice}</td>
                            <td style='text-align: center; background-color: #ccc;'>ИТОГО: {total}</td>
                        </tr>  
                    </table>
                ";
            _detailsTemplate += @"</table><hr>";



            _endTemplate += $@"
                    <table style='margin-top: 40px; margin-bottom: 20px; border-collapse: collapse; width: 100%;' border='0px'>
                        <tr>  
                            <th style='text-align: center;'>Дата</td>
                            <th style='text-align: center;'>Подпись клиента</td>
                            <th style='text-align: center;'>Подпись мастера</td>
                        </tr>  
                        <tr>  
                            <td style='text-align: center;'>{DateTime.Now.ToString("dd/MM/yyyy")}</td>
                            <td style='text-align: center;'>____________</td>
                            <td style='text-align: center;'>____________</td>
                        </tr>  
                    </table>
                ";

            _htmlTemplate += _detailsTemplate;
            _htmlTemplate += _endTemplate;
            _htmlTemplate += _tailTemplate;
            var template = Handlebars.Compile(_htmlTemplate);
            var html = template(repairCheck);
            var pdf = await GeneratePdfAsync(html);
            Stream stream = new MemoryStream(pdf);
            return stream;
        }

        private Task<byte[]> GeneratePdfAsync(string html)
        {
            var wkhtmltopdfPath = Path.Combine(Environment.CurrentDirectory, "Infrastructure/Rotativa");
            var result = WkhtmlDriver.Convert(wkhtmltopdfPath, new ConvertOptions().GetConvertOptions(), html);
            return Task.FromResult(result);
        }
    }
}
