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
    public class CommentsService: IService<CommentsDto>
    {
        private readonly IRepository<Comments> repository;
        private readonly IMapper mapper;
        public CommentsService(IRepository<Comments> repository, IMapper mapper)
        {
            this.repository = repository;
            this.mapper = mapper;
        }


        public async Task<CommentsDto> AddItemAsync(CommentsDto item)
        {
            return mapper.Map<CommentsDto>(await repository.AddItemAsync(mapper.Map<Comments>(item)));
        }
        public async Task DeleteItem(int id)
        {
           await repository.DeleteItem(id);
        }

        public async Task<List<CommentsDto>> GetAllAsync()
        {
            return mapper.Map<List<CommentsDto>>(await repository.getAllAsync());
        }

        public async Task<CommentsDto> GetByIdAsync(int id)
        {
            return mapper.Map<CommentsDto>(await repository.getAsync(id));
        }

        public async Task UpdateItem(int id, CommentsDto item)
        {
           await repository.UpdateItem(id, mapper.Map<Comments>(item));
        }
    }
}
