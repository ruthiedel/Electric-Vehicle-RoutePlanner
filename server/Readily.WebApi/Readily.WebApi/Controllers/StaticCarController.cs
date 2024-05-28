using Microsoft.AspNetCore.Mvc;
using Readily.Common.Entities;
using Readily.Service.Interfaces;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Readily.WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StaticCarController : ControllerBase
    {
        private readonly IService<StaticCarDto> service;
        public StaticCarController(IService<StaticCarDto> service)
        {
            this.service = service;
        }
        // GET: api/<UserController>
        [HttpGet]
        public async Task<ActionResult> Get()
        {
            return Ok(await service.GetAllAsync());
        }

        // GET api/<UserController>/5
        [HttpGet("{id}")]
        public async Task<ActionResult> Get(int id)
        {
            var k = await service.GetByIdAsync(id);
            if (k == null)
            {
                return NotFound();
            }
            return Ok(k);
        }

        // POST api/<UserController>
        [HttpPost]
        public async Task<ActionResult> Post([FromBody] StaticCarDto item)
        {
            if (item == null)
            {
                return NotFound("staticCar cannt add...");
            }
            return Ok(await service.AddItemAsync(item));
        }

        // PUT api/<UserController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] StaticCarDto item)
        {
            service.UpdateItem(id, item);
        }

        // DELETE api/<UserController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            service.DeleteItem(id);
        }
    }
}
