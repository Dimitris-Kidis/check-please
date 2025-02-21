using AutoMapper;
using AutoMapper.QueryableExtensions;
using Common.Templates;
using Core.Domain.Entities;
using Core.Repositories.CheckPleaseRepository;
using Core.Services.EntityValidator;
using HandlebarsDotNet;
using MediatR;
using Microsoft.AspNetCore.StaticFiles;
using Microsoft.EntityFrameworkCore;
using Queries.DTOs;
using Wkhtmltopdf.NetCore;
using static Common.Enums.LanguageLocaleEnum;

namespace Queries.Queries.Repairs.GetRepairCheck
{
    public class GetRepairCheckQueryHandler(
        ICheckPleaseRepository<Repair> repairsRepository,
        IEntityValidatorService<Repair> repairValidator,
        IMapper mapper) : IRequestHandler<GetRepairCheckQuery, FileDto>
    {
        private readonly ICheckPleaseRepository<Repair> repairRepository = repairsRepository;
        private readonly IEntityValidatorService<Repair> repairValidator = repairValidator;
        private readonly IMapper _mapper = mapper;

        public async Task<FileDto> Handle(GetRepairCheckQuery request, CancellationToken cancellationToken)
        {
            await repairValidator.EntityExistsAsync(request.Id, cancellationToken);

            var repair = await repairRepository
                .GetAll()
                .Where(x => x.Id == request.Id)
                .ProjectTo<RepairDto>(_mapper.ConfigurationProvider)
                .SingleAsync(cancellationToken);

            LanguageLocale locale = request.Locale ?? LanguageLocale.Ru;

            Stream stream = GetFileStream(repair, locale);

            string fileName = @$"{repair.Car.CarSign} {repair.RepairDate:dd-MM-yyyy HH:mm}.pdf";
            new FileExtensionContentTypeProvider().TryGetContentType(fileName, out var type);
            return new FileDto
            {
                FileStream = stream,
                ContentType = type,
                FileName = fileName,
            };
        }

        private static Stream GetFileStream(RepairDto repair, LanguageLocale locale)
        {
            var htmlTemplate = CheckLanguageTemplates.GetTemplate(locale);

            var template = Handlebars.Compile(htmlTemplate);

            Handlebars.RegisterHelper("Multiply", (writer, context, parameters) =>
            {
                writer.Write((Convert.ToInt32(parameters[0]) * Convert.ToInt32(parameters[1])).ToString());
            });
            Handlebars.RegisterHelper("Sum", (writer, context, parameters) =>
            {
                writer.Write((Convert.ToInt32(parameters[0]) + Convert.ToInt32(parameters[1])).ToString());
            });
            Handlebars.RegisterHelper("FormatDate", (writer, context, parameters) =>
            {
                writer.Write(((DateTimeOffset)parameters[0]).ToString("dd/MM/yyyy"));
            });

            var details = repair.Details ?? [];
            var data = new
            {
                repair.Id,
                repair.Problems,
                repair.Mileage,
                repair.RepairDate,
                repair.Client,
                repair.Car,
                repair.TotalRepairPrice,
                repair.AdditionalNotes,
                Details = details,
                TotalPartsCost = details.Sum(d => d.PricePerOne * d.Quantity ?? 0),
                TotalLaborCost = details.Sum(d => d.RepairPrice),
                GrandTotal = details.Sum(d => (d.PricePerOne * d.Quantity ?? 0) + d.RepairPrice)
            };

            var html = template(data);
            var pdf = GeneratePdf(html);
            Stream stream = new MemoryStream(pdf);

            return stream;
        }

        private static byte[] GeneratePdf(string html)
        {
            var wkhtmltopdfPath = Path.Combine(Environment.CurrentDirectory, "Infrastructure/Rotativa");
            var result = WkhtmlDriver.Convert(wkhtmltopdfPath, new ConvertOptions().GetConvertOptions(), html);

            return result;
        }
    }
}
