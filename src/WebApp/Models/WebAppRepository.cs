using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WebApp.Models
{
    public class WebAppRepository : IWebAppRepository
    {
        private WebAppContext _context;

        public WebAppRepository(WebAppContext context)
        {
            _context = context;
        }

        public IEnumerable<Poll> GetLatestPolls()
        {
            return _context.Polls.Include(t => t.Options).Include(t=> t.History).ToList();
        }
    }
}
