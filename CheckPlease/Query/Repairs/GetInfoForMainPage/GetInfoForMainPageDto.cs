using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Query.Repairs.GetInfoForMainPage
{
    public class GetInfoForMainPageDto
    {
        public int TodayCarsNumber { get; set; }
        public int MasterIncome { get; set; }
        public int AssistantIncome { get; set; }
        public List<CarItemDto> CarList { get; set; } = new List<CarItemDto>();
    }

    public class CarItemDto
    {
        public int RepairId { get; set; }
        public string CarSign { get; set; }
    }
}
