using Microsoft.AspNetCore.Mvc;
using Readily.Common.Entities;
using Readily.Service.Interfaces;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Readily.WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class KategoryController : ControllerBase
    {
        private readonly IService<KategoryDto> service;
        public KategoryController(IService<KategoryDto> service)
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
        public async Task<ActionResult> Post([FromBody] KategoryDto kategoryDto)
        {
            if (kategoryDto == null)
            {
                return NotFound("USER cannt add...");
            }
            return Ok(await service.AddItemAsync(kategoryDto));
        }

        // PUT api/<UserController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] KategoryDto kategoryDto)
        {
            service.UpdateItem(id, kategoryDto);
        }

        // DELETE api/<UserController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            service.DeleteItem(id);
        }
    }
}
