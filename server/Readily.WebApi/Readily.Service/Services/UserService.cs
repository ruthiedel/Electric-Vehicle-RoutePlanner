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
    public class UserService:IUserService
    {
        private readonly IRepositoryUser repository;
        private readonly IMapper mapper;
        public UserService(IRepositoryUser repository, IMapper mapper)
        {
            this.repository = repository;
            this.mapper = mapper;
        }

        //public async Task<UserDto> AddItemAsync(UserDto item)
        //{
        //    return await repository.AddItemAsync(mapper.Map<User>(item));
        //}
        public async Task<UserDto> AddItemAsync(UserDto item)
        {
            return mapper.Map<UserDto>(await repository.AddItemAsync(mapper.Map<User>(item)));
        }
        public async Task DeleteItem(int id)
        {
           await repository.DeleteItem(id);
        }

        public async Task<List<UserDto>> GetAllAsync()
        {
            return mapper.Map<List<UserDto>>(await repository.getAllAsync());
        }

        public async Task<UserDto> GetByIdAsync(int id)
        {
            return mapper.Map<UserDto>(await repository.getAsync(id));
        }

        public async Task UpdateItem(int id, UserDto item)
        {
            await repository.UpdateItem(id, mapper.Map<User>(item));
        }
        public UserDto LogIn(string email, string password)
        {
            return mapper.Map<UserDto>(repository.LogIn(email, password));   
        }

    }
}
