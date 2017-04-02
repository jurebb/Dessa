using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebApp.Models;
using WebApp.ViewModels;

namespace WebApp.Controllers.Auth
{
    public class AuthController : Controller
    {
        private SignInManager<WebAppUser> _manager;

        public AuthController(SignInManager<WebAppUser> manager)
        {
            _manager = manager;
        }
        
        public IActionResult Login()
        {
            if (User.Identity.IsAuthenticated)      //check if authenticated, return Trips
            {
                return RedirectToAction("Index", "Home");
            }
            return View();                              //if not, same page
        }

        [HttpPost]
        public async Task<IActionResult> Login(string returnUrl, LoginViewModel vm)
        {
            if (ModelState.IsValid)
            {
                var signInResult = await _manager.PasswordSignInAsync(vm.Username, vm.Password, true, false);
                if (signInResult.Succeeded)
                {
                    if (string.IsNullOrWhiteSpace(returnUrl))
                    {
                        return RedirectToAction("Index", "Home");
                    }
                    else
                    {
                        return Redirect(returnUrl);             //returnUrl je dio url-a koji config.Cookies.ApplicationCookie.LoginPath = "/Auth/Login"; u startup-u doda
                    }
                }
                else
                {
                    ModelState.AddModelError("", "Username or password is incorrect");
                }
            }

            return View();
        }

        public async Task<IActionResult> Logout()
        {
            if (User.Identity.IsAuthenticated)
            {
                await _manager.SignOutAsync();
            }

            return RedirectToAction("Login", "Auth");
        }

        public IActionResult Register()
        {
            return View();
        }
    }
}
