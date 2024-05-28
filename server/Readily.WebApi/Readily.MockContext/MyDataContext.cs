using Microsoft.EntityFrameworkCore;
using Readily.Repository.Entities;
using Readily.Repository.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Readily.MockContext
{
    public class MyDataContext : DbContext,IContext
    {
        public DbSet<User> Users { get; set; }
        public DbSet<Car> Cars { get; set; }
        public DbSet<Favorite> Favorites { get; set; }
        public DbSet<Comments> Comments { get; set; }
        public DbSet<Kategory> Kategorys { get; set; }
        public DbSet<StaticCar> StaticCars { get; set; }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer("server=(localdb)\\ProjectsV13;database=ElectricCarsDb;trusted_connection=true");
        }

        public async Task save()
        {
            await SaveChangesAsync();
        }
    }
}
