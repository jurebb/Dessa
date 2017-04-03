﻿using Microsoft.EntityFrameworkCore;
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

        public Poll GetPollById(string pollId)
        {
            return _context.Polls.Include(t => t.Options).Include(t => t.History).Where(t => t.Id == int.Parse(pollId)).FirstOrDefault();
        }

        public void VotePollOption(string pollId, string optionOrder)
        {
            var poll = GetPollById(pollId);
            var option = poll.Options.Where(t => t.Order == int.Parse(optionOrder)).FirstOrDefault();
            option.Votes++;
            poll.SumVotes++;
            //TODO add history
            _context.Polls.Update(poll);
            _context.Options.Update(option);
        }

        public async Task<bool> SaveChangesAsync()
        {
            return (await _context.SaveChangesAsync()) > 0;
        }
    }
}
