using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Query.Repairs.GetCheckPrint
{
    public class GetCheckPrintQuery : IRequest<Stream>
    {
        public int RepairId { get; set; }
    }
}
