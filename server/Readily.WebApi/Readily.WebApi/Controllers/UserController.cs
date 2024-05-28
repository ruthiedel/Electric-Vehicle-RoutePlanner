using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Readily.Common.Entities;
using Readily.Repository.Entities;
using Readily.Service.Interfaces;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Readily.WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private IConfiguration _configuration;

        private readonly IUserService service;
        public UserController(IUserService service, IConfiguration configuration)
        {
            this.service = service;
            _configuration = configuration;
        }
        // GET: api/<UserController>
     
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
            var user = await service.GetByIdAsync(id);
            if (user == null)
            {
                return NotFound();
            }
            return Ok(user);
        }
        [HttpGet("login/{email}/{password}")]
        public IActionResult LogIn(string email, string password)
        {
            var user = service.LogIn(email, password);
            if (user != null)
            {
                var token = Generate(user);
                var response = new AuthResponse
                {
                    Token = token,
                    User = user
                };
                return Ok(response);
            }
            return BadRequest("User not found");
        }

        private string Generate(UserDto user)
        {
            //מפתח להצפנה
            var securitykey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
            //אלגוריתם להצפנה
            var credentials = new SigningCredentials(securitykey, SecurityAlgorithms.HmacSha256);

            var claims = new[] {
            new Claim(ClaimTypes.NameIdentifier,user.Name),
           //new Claim(ClaimTypes.Email,user.Email),
            new Claim(ClaimTypes.Surname,user.Name),
            //new Claim(ClaimTypes.Role,user.Role),
            new Claim(ClaimTypes.GivenName,user.Name)
            };
            var token = new JwtSecurityToken(_configuration["Jwt:Issuer"], _configuration["Jwt:Audience"],
                claims,
                expires: DateTime.Now.AddMinutes(60),
                signingCredentials: credentials);
            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        // POST api/<UserController>
        [HttpPost]
        public async Task<ActionResult> Post([FromBody] UserDto userDto)
        {
            if (userDto == null)
            {
                return NotFound("USER cannt add...");
            }
            var user = await service.AddItemAsync(userDto);
            if (user != null)
            {
                var token = Generate(user);
                var response = new AuthResponse
                {
                    Token = token,
                    User = user
                };
                return Ok(response);
            }
            return BadRequest("User can't be added");

        }

        // PUT api/<UserController>/5
        [Authorize]
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] UserDto userDto)
        {
            service.UpdateItem(id,userDto);
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
public class AuthResponse
{
    public string Token { get; set; }
    public UserDto User { get; set; } // Assuming you have a User class representing user information
}