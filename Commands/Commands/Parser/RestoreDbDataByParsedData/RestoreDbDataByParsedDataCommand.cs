using Commands.Commands.Cars.CreateCar;
using Commands.Commands.Clients.CreateClient;
using Commands.Commands.Repairs.CreateRepair;
using MediatR;

namespace Commands.Commands.Parser.RestoreDbDataByParsedData
{
    public class RestoreDbDataByParsedDataCommand : IRequest
    {
        public CreateClientCommand Client { get; set; }
        public CreateCarCommand Car { get; set; }
        public int TotalRepairPrice { get; set; }
        public int Mileage { get; set; }
        public DateTimeOffset? RepairDate { get; set; }
        public ICollection<CreateDetailCommand> Details { get; set; }
    }
}
