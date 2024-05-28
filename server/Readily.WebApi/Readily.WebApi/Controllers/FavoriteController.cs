
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Readily.Common.Entities;
using Readily.Service.Interfaces;


// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Readily.WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FavoriteController : ControllerBase
    {
        private readonly IServiceExtension<FavoriteDto> service;
        public FavoriteController(IServiceExtension<FavoriteDto> service)
        {
            this.service = service;
        }

        // GET: api/<RoleController>
        [Authorize]
        [HttpGet]
        public Task<List<FavoriteDto>> Get()
        {
            return service.GetAllAsync();
        }

        // GET api/<RoleController>/5
        [Authorize]
        [HttpGet("{id}")]
        public Task<FavoriteDto> Get(int id)
        {
            return service.GetByIdAsync(id);
        }

        [Authorize]
        [HttpPost]
        public async Task<ActionResult> Post([FromBody] FavoriteDto favorite)
        {
            if (favorite == null)
            {
                return NotFound("user cannt add...");
            }
            return Ok(await service.AddItemAsync(favorite));
        }
        [Authorize]
        [HttpGet("user/{id}")]
        public async Task<ActionResult> GetByUsreId(int id)
        {
            return Ok(await service.GetByUserId(id));
        }

        // PUT api/<RoleController>/5
        [HttpPut("{id}")]
        public async Task<ActionResult> Put(int id, [FromBody] FavoriteDto favorite)
        {
            return Ok(service.UpdateItem(id, favorite));
        }

        // DELETE api/<RoleController>/5
        [Authorize]
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            service.DeleteItem(id);
        }
    }
}
