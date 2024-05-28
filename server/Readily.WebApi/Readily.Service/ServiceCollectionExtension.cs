using Readily.Common.Entities;
using Microsoft.Extensions.DependencyInjection;
using Readily.Service.Interfaces;
using Readily.Service;
using Readily.Repository;
using Readily.Service.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Readily.Service
{
    public static class ServiceCollectionExtension
    {
        //הגדרת התלויות
        public static IServiceCollection myAddServices(this IServiceCollection service)
        {

            service.AddRepositories();
            service.AddScoped<IUserService, UserService>();
            service.AddScoped<IServiceExtension<CarDto>, CarService>();
            service.AddScoped<IServiceExtension<FavoriteDto>, FavoriteService>();
            service.AddScoped<IService<CommentsDto>, CommentsService>();
            service.AddScoped<IService<KategoryDto>, KategoryService>();
            service.AddScoped<IService<StaticCarDto>, StaticCarService>();
            service.AddScoped<IAlgorithm, Algorithem>();
            //service.AddScoped(typeof(IService<UserDto>), typeof(UserService));
            // service.AddScoped<IService<User>, user>();
            //user
            //...
            service.AddAutoMapper(typeof(MapperProfile));
            return service;
        }
    }
}