using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebApp.Models;
using WebApp.ViewModels;

namespace WebApp.Controllers.Api
{
    [Authorize]
    public class PollsController : Controller
    {
        private IWebAppRepository _repository;

        public PollsController(IWebAppRepository repository)
        {
            _repository = repository;
        }

        [HttpGet("api/polls")]
        public IActionResult GetLatest()                //TODO check if 'Get()' req'd?
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
                //TODO check history
                _repository.VotePollOption(pollId, optionOrder);
                if (await _repository.SaveChangesAsync())
                {
                    return Ok();
                }
            }
            catch
            {
                
            }
            return BadRequest("Error on poll voting");
        }
    }
}
