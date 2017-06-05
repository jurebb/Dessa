using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WebApp.ViewModels
{
    public class StatsViewModel
    {
        public DateTime LastUpload { get; set; }
        public string TotalPolls { get; set; }
        public string TotalVotes { get; set; }
    }
}
