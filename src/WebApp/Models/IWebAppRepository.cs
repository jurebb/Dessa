using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebApp.ViewModels;

namespace WebApp.Models
{
    public interface IWebAppRepository
    {
        IEnumerable<Poll> GetLatestPolls();
        IEnumerable<Poll> GetUserPolls(string Username);
        StatsViewModel GetUserStats(string Username);
        Poll GetPollById(string pollId);
        void VotePollOption(string pollId, string optionOrder, string Username);
        bool CheckPollHistory(string pollId, string Username);
        void AddPollWithOptions(Poll newPoll);

        Task<bool> SaveChangesAsync();
    }
}
