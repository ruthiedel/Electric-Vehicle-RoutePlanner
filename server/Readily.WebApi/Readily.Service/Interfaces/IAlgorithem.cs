using Microsoft.Identity.Client.Kerberos;
using Readily.Common.Entities;
using System;
using System.Collections.Generic;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Readily.Service.Interfaces
{
    public interface IAlgorithm
    {
        
        public  Task<PointInRoute[]> GetElectricStationsAlongRoute(string origin, string destination, double segmentLength);
        public Task<RouteSegment[]> getRestPoint(PointInRoute[] stations, string[] kategories);
    }
}
