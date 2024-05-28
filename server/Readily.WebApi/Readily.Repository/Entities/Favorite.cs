using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Readily.Repository.Entities
{
    public class Favorite
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Location { get; set; }
        public double Lat { get; set; }
        public double Long { get; set; }
        [ForeignKey("User")]
        public int UserId { get; set; }
        public virtual User User { get; set; }
    }
}
