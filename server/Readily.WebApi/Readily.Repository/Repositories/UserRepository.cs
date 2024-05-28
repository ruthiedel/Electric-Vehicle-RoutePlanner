using Microsoft.EntityFrameworkCore;
using Readily.Repository.Entities;
using Readily.Repository.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Readily.Repository.Repositories
{
    public class UserRepository:IRepositoryUser
    {
        private readonly IContext _context;
        public UserRepository(IContext context)
        {
            _context = context;
        }
        public async Task<List<User>> getAllAsync()
        {
            return await _context.Users.ToListAsync();
        }

        public async Task<User> getAsync(int id)
        {
            return await _context.Users.FirstOrDefaultAsync(x => x.Id == id);            
        }

        public async Task<User> AddItemAsync(User item)
        {
            await _context.Users.AddAsync(item);
            await _context.save();
            return item;
        }

        public async Task UpdateItem(int id, User user)
        {
            User u = _context.Users.FirstOrDefault(x => x.Id == id);
            if(user.Name!=null)
                u.Name=user.Name;
            if(user.Email!=null)    
                u.Email=user.Email;
            if(user.Password!=null)
                u.Password=user.Password;
            
        
           await _context.save();
        }

        public async Task DeleteItem(int id)
        {
            _context.Users.Remove(_context.Users.FirstOrDefault(x => x.Id == id));
            await _context.save();
        }

        public  User LogIn(string email, string password)
        {
            User user =_context.Users.FirstOrDefault(x => x.Email == email && x.Password == password);
            if(user!=null )
            {
                return user;
            }
            return null;
        }

   
    }
}
