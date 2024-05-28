using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Readily.Common.Entities;
using Readily.Service.Interfaces;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Readily.WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CarController : ControllerBase
    {
        private readonly IServiceExtension<CarDto> service;
        public CarController(IServiceExtension<CarDto> service)
        {
            this.service = service;
        }
        // GET: api/<UserController>
        [Authorize]
        [HttpGet]
        public async Task<ActionResult> Get()
        {
            return Ok(await service.GetAllAsync());
        }

        // GET api/<UserController>/5
        [Authorize]
        [HttpGet("{id}")]
        public async Task<ActionResult> Get(int id)
        {
            var car = await service.GetByIdAsync(id);
            if (car == null)
            {
                return NotFound();
            }
            return Ok(car);
        }

        // POST api/<UserController>
        [Authorize]
        [HttpPost]
        public async Task<ActionResult> Post([FromBody] CarDto carDto)
        {
            if (carDto == null)
            {
                return NotFound("USER cannt add...");
            }
            return Ok(await service.AddItemAsync(carDto));
        }

        [Authorize]
        // PUT api/<UserController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] CarDto carDto)
        {
            service.UpdateItem(id, carDto);
        }
        [Authorize]
        [HttpGet("user/{id}")]
        public async Task<ActionResult> GetByUsreId(int id)
        {
            return  Ok(await service.GetByUserId(id));
        }
        // DELETE api/<UserController>/5
        [Authorize]
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            service.DeleteItem(id);
        }
    }
}
