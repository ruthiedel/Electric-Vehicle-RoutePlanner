using Microsoft.AspNetCore.Mvc;
using Readily.Common.Entities;
using Readily.Service.Interfaces;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Readily.WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CommentsController : ControllerBase
    {
        private readonly IService<CommentsDto> service;
        public CommentsController(IService<CommentsDto> service)
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
            var comment = await service.GetByIdAsync(id);
            if (comment == null)
            {
                return NotFound();
            }
            return Ok(comment);
        }

        // POST api/<UserController>
        [HttpPost]
        public async Task<ActionResult> Post([FromBody] CommentsDto commentsDto)
        {
            if (commentsDto == null)
            {
                return NotFound("USER cannt add...");
            }
            return Ok(await service.AddItemAsync(commentsDto));
        }

        // PUT api/<UserController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] CommentsDto commentsDto)
        {
            service.UpdateItem(id, commentsDto);
        }

        // DELETE api/<UserController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            service.DeleteItem(id);
        }
    }
}
