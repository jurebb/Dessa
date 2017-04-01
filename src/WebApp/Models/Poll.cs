using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WebApp.Models
{
    public class Poll
    {
        public int Id { get; set; }
        public DateTime DateCreated { get; set; }
        public string UserName { get; set; }
        public bool UrgentFlag { get; set; }        //TODO maybe remove
        public string Question { get; set; }
        public int NumOfOptions { get; set; }       //TODO maybe not needed (Options.Count()??)
        public ICollection<Option> Options { get; set; }

        public int SumVotes { get; set; }
    }
}
