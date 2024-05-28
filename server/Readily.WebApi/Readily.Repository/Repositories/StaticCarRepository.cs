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
    public class StaticCarRepository: IRepository<StaticCar>
    {
        private readonly IContext _context;
        public StaticCarRepository(IContext context)
        {
            _context = context;
        }
        public async Task<List<StaticCar>> getAllAsync()
        {
            return await _context.StaticCars.ToListAsync();
        }

        public async Task<StaticCar> getAsync(int id)
        {
            return await _context.StaticCars.FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<StaticCar> AddItemAsync(StaticCar item)
        {
            await _context.StaticCars.AddAsync(item);
            await _context.save();
            return item;
        }

        public async Task UpdateItem(int id, StaticCar sCar)
        {
            StaticCar f = _context.StaticCars.FirstOrDefault(x => x.Id == id);
            if (f != null)
            {
                if (sCar.Model != null)
                    f.Model = sCar.Model;
                if (sCar.Company != null)
                    f.Company = sCar.Company;
                if (sCar.Km != null)
                    f.Km = sCar.Km;

                await _context.save();
            }
        }



        public async Task DeleteItem(int id)
        {
            _context.StaticCars.Remove(_context.StaticCars.FirstOrDefault(x => x.Id == id));
            await _context.save();
        }


    }
}
