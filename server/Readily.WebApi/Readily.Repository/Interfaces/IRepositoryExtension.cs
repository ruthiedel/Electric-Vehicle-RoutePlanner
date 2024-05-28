using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Readily.Repository.Interfaces
{
    public interface IRepositoryExtension<T>:IRepository<T>
    {
        public Task<List<T>> GetByUserId(int id);
    }
}
