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
    public class CarService:IServiceExtension<CarDto>
    {
        private readonly IRepositoryExtension<Car> repository;
        private readonly IMapper mapper;
        public CarService(IRepositoryExtension<Car> repository, IMapper mapper)
        {
            this.repository = repository;
            this.mapper = mapper;
        }

        //public async Task<UserDto> AddItemAsync(UserDto item)
        //{
        //    return await repository.AddItemAsync(mapper.Map<User>(item));
        //}
        public async Task<CarDto> AddItemAsync(CarDto item)
        {
            return mapper.Map<CarDto>(await repository.AddItemAsync(mapper.Map<Car>(item)));
        }
        public async Task DeleteItem(int id)
        {
           await repository.DeleteItem(id);
        }

        public async Task<List<CarDto>> GetAllAsync()
        {
            return mapper.Map<List<CarDto>>(await repository.getAllAsync());
        }

        public async Task<CarDto> GetByIdAsync(int id)
        {
            return mapper.Map<CarDto>(await repository.getAsync(id));
        }

        public async Task<List<CarDto>> GetByUserId(int id)
        {
            return mapper.Map<List<CarDto>>(await repository.GetByUserId(id));
        }

        public async Task UpdateItem(int id, CarDto item)
        {
            await repository.UpdateItem(id, mapper.Map<Car>(item));
        }
    }
}
