using Readily.Repository.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Readily.Repository.Interfaces
{
    public interface IRepositoryUser:IRepository<User>
    {
        public User LogIn(string email,string password);

    }
}
