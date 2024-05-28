
using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Readily.Service.Interfaces;
using Readily.Common.Entities;
using Readily.Repository.Interfaces;
using Readily.Repository.Entities;

namespace Readily.Service.Services
{
    public class FavoriteService : IServiceExtension<FavoriteDto>
    {
        private readonly IRepositoryExtension<Favorite> repository;
        private readonly IMapper mapper;
        public FavoriteService(IRepositoryExtension<Favorite> repository, IMapper mapper)
        {
            this.repository = repository;
            this.mapper = mapper;
        }

  
        public async Task<FavoriteDto> AddItemAsync(FavoriteDto item)
        {
            return mapper.Map<FavoriteDto>(await repository.AddItemAsync(mapper.Map<Favorite>(item)));
        }
        public async Task DeleteItem(int id)
        {
          await  repository.DeleteItem(id);
        }

        public async Task<List<FavoriteDto>> GetAllAsync()
        {
            return mapper.Map<List<FavoriteDto>>(await repository.getAllAsync());
        }

        public async Task<FavoriteDto> GetByIdAsync(int id)
        {
            return mapper.Map<FavoriteDto>(await repository.getAsync(id));
        }

        public async Task<List<FavoriteDto>> GetByUserId(int id)
        {
            return mapper.Map<List<FavoriteDto>>(await repository.GetByUserId(id));
        }

        public async Task UpdateItem(int id, FavoriteDto item)
        {
          await  repository.UpdateItem(id, mapper.Map<Favorite>(item));
        }
    }
}