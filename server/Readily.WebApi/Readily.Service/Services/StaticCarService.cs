using AutoMapper;
using Readily.Common.Entities;
using Readily.Repository.Entities;
using Readily.Repository.Interfaces;
using Readily.Service.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Readily.Service.Services
{
    public class StaticCarService:IService<StaticCarDto>
    {
        private readonly IRepository<StaticCar> repository;
        private readonly IMapper mapper;
        public StaticCarService(IRepository<StaticCar> repository, IMapper mapper)
        {
            this.repository = repository;
            this.mapper = mapper;
        }

        //public async Task<UserDto> AddItemAsync(UserDto item)
        //{
        //    return await repository.AddItemAsync(mapper.Map<User>(item));
        //}
        public async Task<StaticCarDto> AddItemAsync(StaticCarDto item)
        {
            return mapper.Map<StaticCarDto>(await repository.AddItemAsync(mapper.Map<StaticCar>(item)));
        }
        public async Task DeleteItem(int id)
        {
            await repository.DeleteItem(id);
        }

        public async Task<List<StaticCarDto>> GetAllAsync()
        {
            return mapper.Map<List<StaticCarDto>>(await repository.getAllAsync());
        }

        public async Task<StaticCarDto> GetByIdAsync(int id)
        {
            return mapper.Map<StaticCarDto>(await repository.getAsync(id));
        }

        public async Task UpdateItem(int id, StaticCarDto item)
        {
            await repository.UpdateItem(id, mapper.Map<StaticCar>(item));
        }
    }
}
