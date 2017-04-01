using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WebApp.Models
{
    public class AppUser    //TODO inherit from IdentityUser?
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public  DateTime DateOfBirth { get; set; }
        //TODO maybe add profile picture
    }
}
