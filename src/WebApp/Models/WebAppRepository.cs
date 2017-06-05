using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebApp.ViewModels;

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
            return _context.Polls.Include(t => t.Options).Include(t=> t.History).OrderByDescending(t => t.DateCreated).Take(15).ToList();
        }

        public IEnumerable<Poll> GetUserPolls(string Username)
        {
            return _context.Polls.Include(t => t.Options).Include(t => t.History).Where(t => t.UserName == Username).OrderByDescending(t => t.DateCreated).Take(15).ToList();
        }

        public StatsViewModel GetUserStats(string Username)
        {
            StatsViewModel statsModel = new StatsViewModel
            {
                LastUpload = _context.Polls.Where(t => t.UserName == Username).OrderByDescending(t => t.DateCreated).FirstOrDefault().DateCreated,
                TotalPolls = _context.Polls.Where(t => t.UserName == Username).Count().ToString(),
                TotalVotes = _context.HistoryPolls.Where(t => t.Username == Username).Count().ToString()
            };
            return statsModel;
        }

        public Poll GetPollById(string pollId)
        {
            return _context.Polls.Include(t => t.Options).Include(t => t.History).Where(t => t.Id == int.Parse(pollId)).FirstOrDefault();
        }

        public void VotePollOption(string pollId, string optionOrder, string Username)
        {
            var poll = GetPollById(pollId);
            var option = poll.Options.Where(t => t.Order == int.Parse(optionOrder)).FirstOrDefault();
            option.Votes++;
            poll.SumVotes++;
            //history
            var history = new HistoryPoll()
            {
                Username = Username
            };
            poll.History.Add(history);

            _context.Polls.Update(poll);
            _context.Options.Update(option);
            _context.HistoryPolls.Add(history);
        }
        
        public bool CheckPollHistory(string pollId, string Username)
        {
            var poll = GetPollById(pollId);
            if(poll.History.Any(t => t.Username == Username))
            {
                return true;
            }
            return false;
        }

        public void AddPollWithOptions(Poll newPoll)
        {
            _context.Polls.Add(newPoll);
        }

        public async Task<bool> SaveChangesAsync()
        {
            return (await _context.SaveChangesAsync()) > 0;
        }
    }
}
