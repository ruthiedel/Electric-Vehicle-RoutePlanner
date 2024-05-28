using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Readily.Service.Interfaces;
using Readily.Common.Entities;
using Readily.Repository.Interfaces;
using Readily.Repository.Entities;
using AutoMapper;

namespace Readily.Service.Services
{
    public class KategoryService:IService<KategoryDto>
    {
        private readonly IRepository<Kategory> repository;
        private readonly IMapper mapper;
        public KategoryService(IRepository<Kategory> repository, IMapper mapper)
        {
            this.repository = repository;
            this.mapper = mapper;
        }

        //public async Task<UserDto> AddItemAsync(UserDto item)
        //{
        //    return await repository.AddItemAsync(mapper.Map<User>(item));
        //}
        public async Task<KategoryDto> AddItemAsync(KategoryDto item)
        {
            return mapper.Map<KategoryDto>(await repository.AddItemAsync(mapper.Map<Kategory>(item)));
        }
        public async Task DeleteItem(int id)
        {
           await repository.DeleteItem(id);
        }

        public async Task<List<KategoryDto>> GetAllAsync()
        {
            return mapper.Map<List<KategoryDto>>(await repository.getAllAsync());
        }

        public async Task<KategoryDto> GetByIdAsync(int id)
        {
            return mapper.Map<KategoryDto>(await repository.getAsync(id));
        }

        public async Task UpdateItem(int id, KategoryDto item)
        {
           await repository.UpdateItem(id, mapper.Map<Kategory>(item));
        }
    }
}

