using Query.Clients.GetClientHistory;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Query.Repairs.GetCheckPrint
{
    public class CheckPrintDto
    {
        public string? FullName { get; set; }
        public string PhoneNumber { get; set; }
        public string CarSign { get; set; }
        public string? VinCode { get; set; }
        public int? Mileage { get; set; }
        public int? Year { get; set; }
        public string? Volume { get; set; }
        public string? Brand { get; set; }
        public string? Model { get; set; }
        public DateTimeOffset RepairDate { get; set; }
    }
}
