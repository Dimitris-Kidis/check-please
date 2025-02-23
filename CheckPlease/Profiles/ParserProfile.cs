using AutoMapper;
using Commands.Commands.Parser.RestoreDbDataByParsedData;
using Parser.Data;

namespace CheckPlease.Profiles
{
    public class ParserProfile : Profile
    {
        public ParserProfile()
        {
            CreateMap<ParsedRepairData, RestoreDbDataByParsedDataCommand>();
        }
    }
}
