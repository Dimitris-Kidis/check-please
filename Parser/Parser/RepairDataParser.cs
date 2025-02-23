namespace Parser.Parser
{
    using Commands.Commands.Cars.CreateCar;
    using Commands.Commands.Clients.CreateClient;
    using Commands.Commands.Repairs.CreateRepair;
    using global::Parser.Data;
    using System;
    using System.Collections.Generic;
    using System.Globalization;
    using System.IO;
    using System.Linq;
    using System.Text;

    public class RepairDataParser
    {
        public static List<ParsedRepairData> ParseFromFile(/*string filePath*/)
        {
            string filePath = @"C:\Users\dmitrii.romanenco\Downloads\CheckPleaseProject\CheckPlease\Parser\UnparsedRepairs.txt";
            string fileContent = File.ReadAllText(filePath, Encoding.UTF8);


            if (!File.Exists(filePath))
                throw new FileNotFoundException("Файл не найден!", filePath);

            //string fileContent = File.ReadAllText(filePath);
            return ParseMultipleRepairs(fileContent);
        }

        public static List<ParsedRepairData> ParseMultipleRepairs(string input)
        {
            var repairBlocks = input.Split('*', StringSplitOptions.RemoveEmptyEntries)
                                    .Select(block => block.Trim())
                                    .Where(block => !string.IsNullOrWhiteSpace(block))
                                    .ToList();

            var parsedRepairs = new List<ParsedRepairData>();

            foreach (var repair in repairBlocks)
            {
                parsedRepairs.Add(ParseSingleRepair(repair));
            }

            return parsedRepairs;
        }

        private static ParsedRepairData ParseSingleRepair(string input)
        {
            try
            {
                var lines = input.Split("\n", StringSplitOptions.RemoveEmptyEntries)
                                 .Select(l => l.Trim())
                                 .ToList();

                if (lines.Count < 6) throw new ArgumentException("Invalid input format");

                // 1. Парсим клиента
                var clientParts = lines[0].Split(';');
                var client = new CreateClientCommand
                {
                    PhoneNumber = clientParts[0],
                    FullName = clientParts[1]
                };

                // 2. Парсим авто
                var carParts = lines[1].Split(';');
                var car = new CreateCarCommand
                {
                    CarSign = carParts[0],
                    Mileage = int.TryParse(carParts[1], out int mileage) ? mileage : 0
                };

                // 3. Парсим детали
                var details = new List<CreateDetailCommand>();
                int index = 3; // Начинаем после пустой строки ";"
                while (lines[index] != ";") // Читаем, пока не встретим следующий разделитель
                {
                    var detailParts = lines[index].Split(';');
                    details.Add(new CreateDetailCommand
                    {
                        DetailName = detailParts[0],
                        PricePerOne = int.TryParse(detailParts[1], out int pricePerOne) ? pricePerOne : null,
                        Quantity = int.TryParse(detailParts[2], out int quantity) ? quantity : null,
                        DetailsPrice = int.TryParse(detailParts[3], out int detailsPrice) ? detailsPrice : null,
                        RepairPrice = int.TryParse(detailParts[4], out int repairPrice) ? repairPrice : 0,
                        TotalPrice = int.TryParse(detailParts[5], out int totalPrice) ? totalPrice : 0
                    });
                    index++;
                }

                // 4. Парсим общую стоимость и дату
                int totalRepairPrice = int.TryParse(lines[index + 1], out int total) ? total : 0;
                DateTimeOffset? repairDate = DateTimeOffset.TryParseExact(
                    lines[index + 2], "dd/MM/yyyy", CultureInfo.InvariantCulture,
                    DateTimeStyles.None, out DateTimeOffset date) ? date : null;

                return new ParsedRepairData
                {
                    Client = client,
                    Mileage = car.Mileage,
                    Car = car,
                    TotalRepairPrice = totalRepairPrice,
                    RepairDate = repairDate,
                    Details = details
                };
            }
            catch (Exception ex)
            {
                // Log or handle the error as needed
                Console.WriteLine($"Error parsing repair data: {ex.Message}");
                return null; // or return some default value if desired
            }
        }

        //private static ParsedRepairData ParseSingleRepair(string input)
        //{



        //    var lines = input.Split("\n", StringSplitOptions.RemoveEmptyEntries)
        //                     .Select(l => l.Trim())
        //                     .ToList();

        //    if (lines.Count < 6) throw new ArgumentException("Invalid input format");

        //    // 1. Парсим клиента
        //    var clientParts = lines[0].Split(';');
        //    var client = new CreateClientCommand
        //    {
        //        PhoneNumber = clientParts[0],
        //        FullName = clientParts[1]
        //    };

        //    // 2. Парсим авто
        //    var carParts = lines[1].Split(';');
        //    var car = new CreateCarCommand
        //    {
        //        CarSign = carParts[0],
        //        Mileage = int.TryParse(carParts[1], out int mileage) ? mileage : 0
        //    };

        //    // 3. Парсим детали
        //    var details = new List<CreateDetailCommand>();
        //    int index = 3; // Начинаем после пустой строки ";"
        //    while (lines[index] != ";") // Читаем, пока не встретим следующий разделитель
        //    {
        //        var detailParts = lines[index].Split(';');
        //        details.Add(new CreateDetailCommand
        //        {
        //            DetailName = detailParts[0],
        //            PricePerOne = int.TryParse(detailParts[1], out int pricePerOne) ? pricePerOne : null,
        //            Quantity = int.TryParse(detailParts[2], out int quantity) ? quantity : null,
        //            DetailsPrice = int.TryParse(detailParts[3], out int detailsPrice) ? detailsPrice : null,
        //            RepairPrice = int.TryParse(detailParts[4], out int repairPrice) ? repairPrice : 0,
        //            TotalPrice = int.TryParse(detailParts[5], out int totalPrice) ? totalPrice : 0
        //        });
        //        index++;
        //    }

        //    // 4. Парсим общую стоимость и дату
        //    int totalRepairPrice = int.TryParse(lines[index + 1], out int total) ? total : 0;
        //    DateTimeOffset? repairDate = DateTimeOffset.TryParseExact(
        //        lines[index + 2], "dd/MM/yyyy", CultureInfo.InvariantCulture,
        //        DateTimeStyles.None, out DateTimeOffset date) ? date : null;



        //    return new ParsedRepairData
        //    {
        //        Client = client,
        //        Mileage = car.Mileage,
        //        Car = car,
        //        TotalRepairPrice = totalRepairPrice,
        //        RepairDate = repairDate,
        //        Details = details
        //    };
        //}
    }

}
