using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Readily.Common.Entities
{
    public class FavoriteDto
    {
        public int Id { get; set; }
        [Required]

        public string Location { get; set; }
        [Required]

        public double Lat { get; set; }
        [Required]

        public double Long { get; set; }
        [Required]

        public string Title { get; set; }
        [Required]

        public int UserId { get; set; }
    }
}
