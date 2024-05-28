using Microsoft.Extensions.DependencyInjection;
using Readily.Repository.Entities;
using Readily.Repository.Interfaces;
using Readily.Repository.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Readily.Repository
{
    public static class ServiceCollectionExtension
    {
        public static IServiceCollection AddRepositories(this IServiceCollection service)
        {

            service.AddScoped<IRepositoryUser, UserRepository>();
            service.AddScoped<IRepositoryExtension<Car>, CarRepository>();
            service.AddScoped<IRepositoryExtension<Favorite>, FavoriteRepository>();
            service.AddScoped<IRepository<Comments>, CommentsRepository>();
            service.AddScoped<IRepository<Kategory>, KategoryRepository>();
            service.AddScoped<IRepository<StaticCar>, StaticCarRepository>();

            return service;
        }
    }
}
