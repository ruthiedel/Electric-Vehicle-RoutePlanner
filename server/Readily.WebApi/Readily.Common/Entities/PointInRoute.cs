using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Readily.Common.Entities
{
    public class PointInRoute
    {
        public double Lat { get; set; }
        public double Lng { get; set; }
        public PointInRoute(double lat,double lng)
        {
            Lat = lat;  
            Lng = lng;  
        }  
    }


    public class RouteSegment : IComparable<RouteSegment>
    {
        public PointInRoute Point { get; set; }
        public double Distance { get; set; }
        public string Name { get; set; }
        public RouteSegment(PointInRoute point, double distance)
        {
            Point = point;
            Distance = distance;
            Name = "";
        }


        public int CompareTo(RouteSegment? other)
        {
            return (int)(this.Distance - other.Distance);
        }
    }
    public class GoogleMapsApiResponse
    {
        public string Status { get; set; }
        public string[] DestinationAddresses { get; set; }
        public string[] OriginAddresses { get; set; }
        public Row[] Rows { get; set; }
    }

    public class Row
    {
        public Element[] Elements { get; set; }
    }

    public class Element
    {
        public Distance Distance { get; set; }
        public Duration Duration { get; set; }
    }

    public class Distance
    {
        public string Text { get; set; }
        public int Value { get; set; }
    }

    public class Duration
    {
        public string Text { get; set; }
        public int Value { get; set; }
    }




    public class GoogleMapsApiRouteResponse
    {
        public Route[] Routes { get; set; }
        public List<Geometry> Geoms { get; set; }
    }

    public class Route
    {
        public Leg[] Legs { get; set; }
    }

    public class Leg
    {
        public Step[] Steps { get; set; }
    }

    public class Step
    {
        public Polyline Polyline { get; set; }
        public PointInRoute start_location { get; set; }
    }

    public class Geometry
    {
        public PointInRoute RoutePoints { get; set; }
    }

    public class Polyline
    {
        public string Points { get; set; }
    }
    public class RestRequest
    {
        public PointInRoute[] ChargePoints { get; set; }
        public string[] Kategories { get; set; }

    }
}
