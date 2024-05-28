using Readily.Common.Entities;
using Readily.Repository.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Readily.Service.Interfaces
{
    public interface IUserService: IService<UserDto>
    {
        public UserDto LogIn(string email,string password);

    }
}
