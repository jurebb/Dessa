using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WebApp.Models
{
    public class WebAppSeedData
    {
        private WebAppContext _context;
        private UserManager<WebAppUser> _userManager;

        public WebAppSeedData(WebAppContext context, UserManager<WebAppUser> userManager)
        {
            _context = context;
            _userManager = userManager;
        }

        public async Task EnsureSeedData()
        {
            if (await _userManager.FindByEmailAsync("baban.jure@gmail.com") == null)
            {
                var NewUser = new WebAppUser()
                {
                    UserName = "babanjure",
                    Email = "baban.jure@gmail.com"
                };
                await _userManager.CreateAsync(NewUser, "P@ssw0rd!");
            }

            if (await _userManager.FindByEmailAsync("hr.babanjure@gmail.com") == null)
            {
                var NewUser = new WebAppUser()
                {
                    UserName = "alterjure",
                    Email = "hr.babanjure@gmail.com"
                };
                await _userManager.CreateAsync(NewUser, "P@qqw3rd!");
            }

            if (!_context.Polls.Any())
            {
                Poll poll1 = new Poll()
                {
                    DateCreated = DateTime.Now,
                    NumOfOptions = 2,
                    Question = "What should I name my cat?",
                    SumVotes = 1,
                    UrgentFlag = false,
                    UserName = "babanjure",
                    Options = new List<Option>()
                    {
                        new Option() { Text = "Micko", Order = 0, Votes = 1},
                        new Option() { Text = "Maroje", Order = 1, Votes = 0}
                    },
                    History = new List<HistoryPoll>()
                    {
                        new HistoryPoll() { Username = "alterjure" }
                    }
                };
                _context.Polls.Add(poll1);
                _context.Options.AddRange(poll1.Options);
                _context.HistoryPolls.AddRange(poll1.History);

                Poll poll2 = new Poll()
                {
                    DateCreated = DateTime.Now,
                    NumOfOptions = 3,
                    Question = "Koju marku TV-a odabrati?",
                    SumVotes = 1,
                    UrgentFlag = false,
                    UserName = "babanjure",
                    Options = new List<Option>()
                    {
                        new Option() { Text = "Philips", Order = 0, Votes = 0},
                        new Option() { Text = "Samsung", Order = 1, Votes = 1},
                        new Option() { Text = "LG", Order = 2, Votes = 0}
                    },
                    History = new List<HistoryPoll>()
                    {
                        new HistoryPoll() { Username = "alterjure" }
                    }
                };
                _context.Polls.Add(poll2);
                _context.Options.AddRange(poll2.Options);
                _context.HistoryPolls.AddRange(poll1.History);

            }
            /*
            if(!_context.Decisions.Any())
            {
                Decision dec1 = new Decision()
                {
                    DateCreated = DateTime.Now,
                    Text = "Plava ili zelena kravata?",
                    FirstText = "Bijela",
                    FirstSumVotes = 0,
                    SecondText = "Zelena",
                    SecondSumVotes = 0,
                    ImageUrl = String.Empty,
                    UrgentFlag = true,
                    UserName = "babanjure"
                };

                _context.Decisions.Add(dec1);
            }
            */

            await _context.SaveChangesAsync();
        }
    }
}
