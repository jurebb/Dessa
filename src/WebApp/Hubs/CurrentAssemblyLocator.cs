using Microsoft.AspNetCore.SignalR.Hubs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;

namespace WebApp.Hubs
{
    public class CurrentAssemblyLocator : IAssemblyLocator
    {
        public IList<Assembly> GetAssemblies()
        {
            return new[] { Assembly.GetEntryAssembly() };
        }
    }
}
