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
        private WebAppContext _context;
        private SignInManager<WebAppUser> _manager;
        private UserManager<WebAppUser> _userManager;

        public AuthController(SignInManager<WebAppUser> manager, UserManager<WebAppUser> userManager, WebAppContext context)
        {
            _manager = manager;
            _userManager = userManager;
            _context = context;
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

        [HttpPost]
        public async Task<IActionResult> Register(RegisterViewModel vm)
        {
            if (ModelState.IsValid)
            {
                if (vm.Password == vm.RepeatedPassword)
                {
                    if (await _userManager.FindByNameAsync(vm.Username) == null || _userManager.FindByEmailAsync(vm.Email) == null)
                    {
                        var NewUser = new WebAppUser()
                        {
                            FirstName = vm.FirstName,
                            LastName = vm.LastName,
                            UserName = vm.Username,
                            Email = vm.Email,
                            DateOfBirth = vm.DateOfBirth
                        };
                        await _userManager.CreateAsync(NewUser, vm.Password);
                        _context.SaveChangesAsync().Wait();
                        return RedirectToAction("Login", "Auth");
                    }
                }
                
            }
            return View();
        }
    }
}
