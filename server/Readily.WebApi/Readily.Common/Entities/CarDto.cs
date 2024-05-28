using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace Readily.Common.Entities
{
    public class CarDto
    {
        public int Id { get; set; }
        [Required]

        public string Name { get; set; }

        [Required]

        public int StaticCarId { get; set; }
        [Required]

        public int UserId { get; set; }
    }
}
