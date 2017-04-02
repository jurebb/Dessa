using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WebApp.Models
{
    public class Decision
    {
        public int Id { get; set; }
        public DateTime DateCreated { get; set; }
        public string UserName { get; set; }
        public bool UrgentFlag { get; set; }        //TODO maybe remove
        public string ImageUrl { get; set; }
        public string FirstText { get; set; }
        public string SecondText { get; set; }
        public int FirstSumVotes { get; set; }
        public int SecondSumVotes { get; set; }
        public string Text { get; set; }
    }
}
