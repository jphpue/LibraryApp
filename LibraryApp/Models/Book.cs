using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace LibraryApp.Models
{
    public class Book
    {
        [Required, Key]
        public int id { get; set; }
        public string author { get; set; }
        public string title { get; set; }
        public string description { get; set; }
    }
}
