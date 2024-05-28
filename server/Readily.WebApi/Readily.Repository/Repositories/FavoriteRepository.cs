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
    public class FavoriteRepository: IRepositoryExtension<Favorite>
    {
        private readonly IContext _context;
        public FavoriteRepository(IContext context)
        {
            _context = context;
        }
        public async Task<List<Favorite>> getAllAsync()
        {
            return await _context.Favorites.ToListAsync();
        }

        public async Task<Favorite> getAsync(int id)
        {
            return await _context.Favorites.FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<Favorite> AddItemAsync(Favorite item)
        {
            await _context.Favorites.AddAsync(item);
            await _context.save();
            return item;
        }

        public async Task UpdateItem( int id, Favorite favorite)
        {
            Favorite f = _context.Favorites.FirstOrDefault(x => x.Id == id);
            if (f != null)
            {
                if (favorite.Location != null)
                    f.Location = favorite.Location;
                if (favorite.Title != null)
                    f.Title = favorite.Title;
                if (favorite.Lat != null)
                {
                    f.Lat = favorite.Lat;
                }
                if (favorite.Long != null)
                    f.Long = favorite.Long;
                await _context.save();
            }
        }

     

        public async Task DeleteItem(int id)
        {
            _context.Favorites.Remove(_context.Favorites.FirstOrDefault(x => x.Id == id));
            await _context.save();
        }

        public async Task<List<Favorite>> GetByUserId(int id)
        {
            return await _context.Favorites.Where(x => x.UserId == id).ToListAsync();
        }
    }
}
