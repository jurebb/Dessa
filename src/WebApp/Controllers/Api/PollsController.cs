using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebApp.Models;
using WebApp.ViewModels;

namespace WebApp.Controllers.Api
{
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
    }
}
