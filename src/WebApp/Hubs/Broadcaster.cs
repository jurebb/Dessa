using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApp.ViewModels;

namespace WebApp.Hubs
{
    public class Broadcaster : Hub<IBroadcaster>
    {
        public override Task OnConnected()
        {
            // Set connection id for just connected client only
            return Clients.Client(Context.ConnectionId).SetConnectionId(Context.ConnectionId);
        }

        // Server side methods called from client
        public Task Subscribe(int pollId)
        {
            return Groups.Add(Context.ConnectionId, pollId.ToString());
        }

        public Task Unsubscribe(int pollId)
        {
            return Groups.Remove(Context.ConnectionId, pollId.ToString());
        }
    }

    public interface IBroadcaster
    {
        Task SetConnectionId(string connectionId);
        Task UpdateVote(IEnumerable<PollsViewModel> poll);
    }
}
