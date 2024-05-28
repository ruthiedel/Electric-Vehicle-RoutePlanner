
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
namespace Readily.Repository.Entities
{
    public class Comments
    {
        public int Id { get; set; } 
        public string Context { get; set; }
        public string Title { get; set; }   
        public int Mark { get; set; }   
        public DateTime Date { get; set; }
        public int PId { get; set; }
        [ForeignKey("User")]
        public int UserId { get; set; }
        public virtual User User { get; set; }
        
    }
}
