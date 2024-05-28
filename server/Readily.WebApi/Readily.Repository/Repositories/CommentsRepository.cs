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
    public class CommentsRepository :IRepository<Comments>
    {
        private readonly IContext _context;
        public CommentsRepository(IContext context)
        {
            _context = context;
        }
        public async Task<Comments> AddItemAsync(Comments item)
        {
            await _context.Comments.AddAsync(item);
            await _context.save();
            return item;
        }

        public async Task DeleteItem(int id)
        {
            _context.Comments.Remove(_context.Comments.FirstOrDefault(x => x.Id == id));
            await _context.save();
        }

        public async Task<List<Comments>> getAllAsync()
        {
            return await _context.Comments.ToListAsync();
        }

        public async Task<Comments> getAsync(int id)
        {
            return await _context.Comments.FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task UpdateItem(int id, Comments item)
        {
               
        }
    }
}
