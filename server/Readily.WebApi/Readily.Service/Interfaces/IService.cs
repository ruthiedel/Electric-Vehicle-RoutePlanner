using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Readily.Service.Interfaces
{
    public interface IService<T>
    {
        public Task<List<T>> GetAllAsync();
        public Task<T> GetByIdAsync(int id);
        public Task<T> AddItemAsync(T item);
        public Task UpdateItem(int id,T item);
        public Task DeleteItem(int id);
    }
}
