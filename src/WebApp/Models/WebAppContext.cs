using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WebApp.Models
{
    public class WebAppContext : IdentityDbContext<WebAppUser>
    {
        private IConfigurationRoot _config;

        public WebAppContext(IConfigurationRoot config, DbContextOptions options) : base(options)
        {
            _config = config;
        }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            base.OnConfiguring(optionsBuilder);

            optionsBuilder.UseSqlServer(_config["SqlConnectionString:String"]);
        }

        public DbSet<Poll> Polls { get; set; }
        public DbSet<Option> Options { get; set; }
        //public DbSet<Decision> Decisions { get; set; }

        public DbSet<HistoryPoll> HistoryPolls { get; set; }
        public DbSet<HistoryDecision> HistoryDecisions { get; set; }
    }
}
