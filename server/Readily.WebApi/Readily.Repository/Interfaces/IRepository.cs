using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Readily.Repository.Interfaces
{
    public interface IRepository<T>
    {   
        public Task<List<T>> getAllAsync();
        public Task<T> getAsync(int id);
        public Task<T> AddItemAsync(T item);
        public Task UpdateItem(int id, T item);
        public Task DeleteItem(int id);
    }
}
