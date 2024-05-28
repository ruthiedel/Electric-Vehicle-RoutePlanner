using Microsoft.AspNetCore.Mvc;
using Readily.Common.Entities;
using Readily.Service.Interfaces;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Readily.WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AlgorithmController : ControllerBase
    {


        private readonly IAlgorithm service;
        public AlgorithmController(IAlgorithm service)
        {
            this.service = service;
        }
        [HttpPost]
        public async Task<RouteSegment[]> Post([FromBody] RestRequest request)
        {
            return await service.getRestPoint(request.ChargePoints, request.Kategories);
        }
        [HttpGet("{origin}/{destination}/{km}")]
        public async Task<PointInRoute[]> Get(string origin,string destination,int km)
        {
            return await service.GetElectricStationsAlongRoute(origin,destination,km);
        }




    }
}
