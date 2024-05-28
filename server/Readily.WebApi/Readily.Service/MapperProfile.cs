using AutoMapper;
using Readily.Common.Entities;
using Readily.Repository.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Readily.Service
{
    public class MapperProfile:Profile
    {
        public MapperProfile()
        {
            CreateMap<User, UserDto>().ReverseMap();
            CreateMap<Car, CarDto>().ReverseMap();
            CreateMap<Favorite, FavoriteDto>().ReverseMap();
            CreateMap<Comments, CommentsDto>().ReverseMap();
            CreateMap<Kategory, KategoryDto>().ReverseMap();
            CreateMap<StaticCar, StaticCarDto>().ReverseMap();

        }
    }
}
