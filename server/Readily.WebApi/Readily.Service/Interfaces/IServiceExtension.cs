using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Readily.Service.Interfaces
{
    public interface IServiceExtension<T>:IService<T>
    {
        public Task<List<T>> GetByUserId(int id);
    }
}
