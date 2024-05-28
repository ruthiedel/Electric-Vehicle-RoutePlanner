using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace Readily.Common.Entities
{
    public class CommentsDto
    {
        public int Id { get; set; }
        public string Context { get; set; }
        public string Title { get; set; }
        public int Mark { get; set; }
        public DateTime Date { get; set; }
        public int PId { get; set; }
        public int UserId { get; set; }
    }
}
