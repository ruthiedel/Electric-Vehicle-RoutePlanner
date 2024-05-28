using Readily.Repository.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Readily.Repository.Entities
{
    //public class Car
    //{
    //    public int Id { get; set; } 
    //    [ForeignKey("StaticCar")]
    //    public int StaticCarId { get; set; }
    //    public virtual StaticCar StaticCar { get; set; }


    //    [ForeignKey("User")]
    //    public int UserId { get; set; }
    //    public virtual User User { get; set; }
    //}

    public class Car
    {
        public int Id { get; set; }
        public string Name { get; set; }    

        [ForeignKey("StaticCar")]
        public int StaticCarId { get; set; }
        public virtual StaticCar StaticCar { get; set; }

        [ForeignKey("User")]
        public int UserId { get; set; }
        public virtual User User { get; set; }
    }
}
