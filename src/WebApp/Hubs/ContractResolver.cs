using System;
using System.Reflection;
using Microsoft.AspNetCore.SignalR.Infrastructure;
using Newtonsoft.Json.Serialization;


//What happens here is that you cannot use the camel case contract resolver for the SignalR internals, because it would break the communication with the client.
//So every time we resolve a contract in the ResolveContract method we have to check the assembly of the type currently resolved and check wether it is SignalR 
//internal. If not, then we can resolve the contract using camel case.
public class SignalRContractResolver : IContractResolver
{
    private readonly Assembly _assembly;
    private readonly IContractResolver _camelCaseContractResolver;
    private readonly IContractResolver _defaultContractSerializer;

    public SignalRContractResolver()
    {
        _defaultContractSerializer = new DefaultContractResolver();
        _camelCaseContractResolver = new CamelCasePropertyNamesContractResolver();
        _assembly = typeof(Connection).GetTypeInfo().Assembly;
    }


    public JsonContract ResolveContract(Type type)
    {
        if (type.GetTypeInfo().Assembly.Equals(_assembly))
            return _defaultContractSerializer.ResolveContract(type);

        return _camelCaseContractResolver.ResolveContract(type);
    }

}