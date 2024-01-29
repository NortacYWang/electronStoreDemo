using System;
using ElectronCgi.DotNet;
using Microsoft.Extensions.Logging;

namespace Core
{
    class Program
    {
        static void Main(string[] args)
        {
           var connection = new ConnectionBuilder().WithLogging(minimumLogLevel: LogLevel.Trace).Build();
            
            connection.On<string, string>("greeting", name => {
                return $"Hello {name}!";
            });
            
            connection.Listen();    
        }
    }
}
