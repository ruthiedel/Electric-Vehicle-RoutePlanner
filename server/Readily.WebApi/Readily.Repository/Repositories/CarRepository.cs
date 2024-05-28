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
    public class CarRepository : IRepositoryExtension<Car>
    {

        private readonly IContext _context;
        public CarRepository(IContext context)
        {
            _context = context;
        }
        public async Task<Car> AddItemAsync(Car item)
        {
            await _context.Cars.AddAsync(item);
            await _context.save();
            return item;
        }

        public async Task DeleteItem(int id)
        {
            _context.Cars.Remove(_context.Cars.FirstOrDefault(x => x.Id == id));
            await _context.save();
        }

        public async Task<List<Car>> getAllAsync()
        {
            return await _context.Cars.ToListAsync();
        }

        public async Task<Car> getAsync(int id)
        {
            return await _context.Cars.FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<List<Car>> GetByUserId(int id)
        {
           return await _context.Cars.Where(x=> x.UserId == id).ToListAsync();  
        }

        public async Task UpdateItem(int id, Car item)
        {
            Car c = _context.Cars.FirstOrDefault(x => x.Id == id);
            if (c.UserId != null)
                c.UserId = item.UserId;
            if (c.StaticCar != null)
                c.StaticCar.Id = item.StaticCar.Id;
            if (c.Name != null)
                c.Name = item.Name;

            await _context.save();
        }
    }
}
