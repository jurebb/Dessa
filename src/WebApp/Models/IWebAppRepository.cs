using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WebApp.Models
{
    public interface IWebAppRepository
    {
        IEnumerable<Poll> GetLatestPolls();
        Poll GetPollById(string pollId);
        void VotePollOption(string pollId, string optionOrder, string Username);
        bool CheckPollHistory(string pollId, string Username);
        void AddPollWithOptions(Poll newPoll);

        Task<bool> SaveChangesAsync();
    }
}
