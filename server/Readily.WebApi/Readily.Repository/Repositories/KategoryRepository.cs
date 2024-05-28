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
    public class KategoryRepository : IRepository<Kategory>
    {
        private readonly IContext _context;
        public KategoryRepository(IContext context)
        {
            _context = context;
        }
        public async Task<List<Kategory>> getAllAsync()
        {
            return await _context.Kategorys.ToListAsync();
        }

        public async Task<Kategory> getAsync(int id)
        {
            return await _context.Kategorys.FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<Kategory> AddItemAsync(Kategory item)
        {
            await _context.Kategorys.AddAsync(item);
            await _context.save();
            return item;
        }

        public async Task UpdateItem(int id, Kategory favorite)
        {
            Kategory f = _context.Kategorys.FirstOrDefault(x => x.Id == id);
            if (f != null)
            {
                if (favorite.Name != null)
                    f.Name = favorite.Name;
             
               await _context.save();
            }
        }



        public async Task DeleteItem(int id)
        {
            _context.Kategorys.Remove(_context.Kategorys.FirstOrDefault(x => x.Id == id));
            await _context.save();
        }
    }
}
