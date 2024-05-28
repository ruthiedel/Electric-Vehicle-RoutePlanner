using Microsoft.EntityFrameworkCore;
using Readily.Repository.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Readily.Repository.Interfaces
{
    public interface IContext
    {
        public DbSet<User> Users { get; set; }
        public DbSet<Car> Cars { get; set; }
        public DbSet<Favorite> Favorites { get; set; }
        public DbSet<Comments> Comments { get; set; }
        public DbSet<Kategory> Kategorys { get; set; }
        public DbSet<StaticCar> StaticCars { get; set; }

        public Task save();
    }
}
