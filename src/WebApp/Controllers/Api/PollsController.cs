using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR.Infrastructure;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using WebApp.Hubs;
using WebApp.Models;
using WebApp.ViewModels;

namespace WebApp.Controllers.Api
{
    [Authorize]
    public class PollsController : ApiHubController<Broadcaster>        //ApiHubController derives from controller
    {
        private IWebAppRepository _repository;

        public PollsController(IWebAppRepository repository, IConnectionManager signalRConnectionManager) : base(signalRConnectionManager)
        {
            _repository = repository;
        }

        [HttpGet("api/polls")]
        public IActionResult GetLatest() 
        {
            try
            {
                var data = _repository.GetLatestPolls();
                return Ok(Mapper.Map<IEnumerable<PollsViewModel>>(data));
            }
            catch
            {
                return BadRequest("Failed to get data");
            }
        }

        [HttpPut("api/polls/v/{pollId}")]
        public async Task<IActionResult> VotePoll([FromBody]dynamic data, string pollId)
        {
            string optionOrder = data["optionOrder"];
            try
            {
                if (! _repository.CheckPollHistory(pollId, User.Identity.Name))
                {
                    _repository.VotePollOption(pollId, optionOrder, User.Identity.Name);
                    var updatedVote = _repository.GetLatestPolls();
                    if (await _repository.SaveChangesAsync())
                    {
                        var updatedVoteVM = Mapper.Map<IEnumerable<PollsViewModel>>(updatedVote);
                        await Clients.All.UpdateVote(updatedVoteVM);
                        //await Clients.Group(pollId).UpdateVote(updatedVoteVM);
                        //using (var client = new HttpClient())
                        //{
                        //    await client.PutAsJsonAsync<IEnumerable<PollsViewModel>>("http://localhost:63780/api/polls/v/" + pollId, updatedVoteVM);
                        //}
                        return Ok(updatedVoteVM);
                    }
                }
                else
                {
                    return NotFound("Already voted");
                }
            }
            catch
            {
                
            }
            
            

            return BadRequest("Error on poll voting");
        }

        [HttpPost("api/polls")]
        public async Task<IActionResult> Post([FromBody]PollsViewModel poll)            //DECS assuming that we will nest array of options inside a poll. presumably doable with seperate jsons if not working.
        {                                                                               //OR with seperate api calls (e.g. api/polls and then api/options/{pollid} for each opt.)   //TODO
            if(ModelState.IsValid)
            {
                int optionCount = 0;
                var newPoll = Mapper.Map<Poll>(poll);
                newPoll.UserName = User.Identity.Name;
                newPoll.DateCreated = DateTime.Now;
                newPoll.NumOfOptions = newPoll.Options.Count();
                newPoll.SumVotes = 0;
                foreach(Option opt in newPoll.Options)
                {
                    opt.Order = optionCount++;
                }
                _repository.AddPollWithOptions(newPoll);

                if (await _repository.SaveChangesAsync())
                {
                    return Created($"api/polls/{newPoll.DateCreated.ToString()}", Mapper.Map<PollsViewModel>(newPoll));
                }
            }
            return BadRequest("Failed to save the poll");
        }
    }
}
