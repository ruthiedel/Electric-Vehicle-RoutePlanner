using Readily.Common.Entities;
using Readily.Service.Interfaces;
using System;
using System.Collections.Generic;
using System.Drawing;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using ConsoleApp2;
using System.Collections;
using Microsoft.Data.SqlClient.DataClassification;
using System.Data;

namespace Readily.Service.Services
{
    public class Algorithem : IAlgorithm
    {
        public  double minSum = int.MaxValue;
        public  RouteSegment[] MinArr;
        public const string ApiKey = "Googl_Map_API_Key";

        public  async Task<RouteSegment[][]> DecomposeRoute(PointInRoute[] points, double km)//חלוקת המסלול לסגמנטים
        {
            List<List<RouteSegment>> segments = new List<List<RouteSegment>>();

            List<RouteSegment> currentSegment = new List<RouteSegment>();
            double segmentDistance = 0;

            if (points != null && points.Length > 0)
            {
                for (int i = 0; i < points.Length - 1; i++)
                {
                    PointInRoute point1 = points[i];
                    PointInRoute point2 = points[i + 1];
                    double dist = await GetDistance(point1, point2, "driving");

                    if (segmentDistance + dist < km)
                    {

                        currentSegment.Add(new RouteSegment(point1, segmentDistance));
                        segmentDistance += dist;
                    }
                    else
                    {
                        currentSegment.Add(new RouteSegment(point1, segmentDistance));
                        segments.Add(currentSegment);
                        currentSegment = new List<RouteSegment>();
                        segmentDistance = 0;
                    }
                }

                currentSegment.Add(new RouteSegment(new PointInRoute(points[points.Length - 1].Lat, points[points.Length - 1].Lng), (segmentDistance + await GetDistance(points[points.Length - 1], points[points.Length - 2], "driving"))));

                segments.Add(currentSegment);
            }

            return segments.Select(s => s.ToArray()).ToArray();
        }


        public  async Task<double> GetDistance(PointInRoute p1, PointInRoute p2, string mode)
        {
            string origin = $"{p1.Lat},{p1.Lng}";
            string destination = $"{p2.Lat},{p2.Lng}";
            string url = $"https://maps.googleapis.com/maps/api/distancematrix/json?origins={origin}&destinations={destination}&mode={mode}&key={ApiKey}";

            using (var client = new HttpClient())
            {
                var response = await client.GetAsync(url);
                if (response.IsSuccessStatusCode)
                {
                    var jsonString = await response.Content.ReadAsStringAsync();
                    var data = JsonConvert.DeserializeObject<GoogleMapsApiResponse>(jsonString);

                    if (data.Status == "OK" && data.Rows.Length > 0 && data.Rows[0].Elements.Length > 0)
                    {
                        int distanceInMeters = data.Rows[0].Elements[0].Distance.Value;
                        double distanceInKilometers = distanceInMeters / 1000.0;
                        return distanceInKilometers;
                    }
                }
            }

            // Return a default value or handle the failure case appropriately
            return -1;
        }


        public async Task<PointInRoute[]> GetRoutePoints(string origin, string destination)
        {
            string apiUrl = $"https://maps.googleapis.com/maps/api/directions/json?origin={origin}&destination={destination}&key={ApiKey}";

            using (HttpClient client = new HttpClient())
            {
                HttpResponseMessage response = await client.GetAsync(apiUrl);

                if (!response.IsSuccessStatusCode)
                {
                    throw new Exception($"Failed to get response. Status code: {response.StatusCode}");
                }

                string json = await response.Content.ReadAsStringAsync();
                GoogleMapsApiRouteResponse apiResponse = JsonConvert.DeserializeObject<GoogleMapsApiRouteResponse>(json);
                var route = apiResponse.Routes?.FirstOrDefault();
                Leg leg = route?.Legs?.FirstOrDefault();
                Step[] steps = leg?.Steps;

                if (steps == null || steps.Length == 0)
                {
                    return null; // or throw new Exception("No steps found.");
                }

                // Decode polyline points and convert them into PointInRoute objects
                List<PointInRoute> routePoints = new List<PointInRoute>();

                foreach (var step in steps)
                {
                    routePoints.Add(step.start_location);
                }


                return routePoints.ToArray();

            }
        }

        public  RouteSegment[] PointForCharging(RouteSegment[][] route, double km)
        {
            List<RouteSegment> chosen = new List<RouteSegment>();

            foreach (var segments in route)
            {
                int y = 0;
                int i = segments.Length - 1;
                while (i >= 0 && km - segments[segments.Length - y - 1].Distance < 1)
                {
                    i--;
                    y++;
                }

                if (i >= 0)
                {
                    chosen.Add(segments[i]);
                }
            }

            return chosen.ToArray();
        }
        public  async Task<(double Lat, double Lng)> GetNearestElectricStation(double latitude, double longitude)
        {
            string apiUrl = $"https://maps.googleapis.com/maps/api/place/nearbysearch/json?key={ApiKey}&type=electric_vehicle_charging_station&location={latitude},{longitude}&rankby=distance";

            using (HttpClient client = new HttpClient())
            {
                HttpResponseMessage response = await client.GetAsync(apiUrl);

                if (response.IsSuccessStatusCode)
                {
                    string jsonResponse = await response.Content.ReadAsStringAsync();
                    JObject jsonObject = JObject.Parse(jsonResponse);

                    // Check if there are any results
                    if (jsonObject["results"].Count() == 0)
                    {
                        throw new Exception("No electric charging stations found nearby.");
                    }
                    // Get the latitude and longitude of the first result
                    double lat = (double)jsonObject["results"][0]["geometry"]["location"]["lat"];
                    double lng = (double)jsonObject["results"][0]["geometry"]["location"]["lng"];

                    return (lat, lng);
                }
                else
                {
                    throw new HttpRequestException($"Failed to get response. Status code: {response.StatusCode}");
                }
            }
        }

        public  async Task<PointInRoute[]> GetNearestElectricStations(RouteSegment[] points)
        {
            List<PointInRoute> nearestStations = new List<PointInRoute>();

            foreach (var point in points)
            {
                // Get the nearest electric charging station for each point
                var (stationLat, stationLng) = await GetNearestElectricStation((double)point.Point.Lat, (double)point.Point.Lng);

                var a = nearestStations.FirstOrDefault(x => x.Lat == stationLat && x.Lng == stationLng);
                if(a==null)
                   nearestStations.Add(new PointInRoute(stationLat, stationLng));
            }

            return nearestStations.ToArray();
        }
        public  async Task<RouteSegment> GetNearestBy(PointInRoute chargingStation, string kategory)
        {
            string apiUrl = $"https://maps.googleapis.com/maps/api/place/nearbysearch/json?key={ApiKey}&type={kategory}&location={chargingStation.Lat},{chargingStation.Lng}&rankby=distance";
            using (HttpClient client = new HttpClient())
            {
                HttpResponseMessage response = await client.GetAsync(apiUrl);
                if (response.IsSuccessStatusCode)
                {
                    string jsonResponse = await response.Content.ReadAsStringAsync();
                    JObject jsonObject = JObject.Parse(jsonResponse);

                    // Check if there are any results
                    if (jsonObject["results"].Count() == 0)
                    {
                        throw new Exception("No electric charging stations found nearby.");
                    }

                    // Get the latitude and longitude of the first result
                    double lat = (double)jsonObject["results"][0]["geometry"]["location"]["lat"];
                    double lng = (double)jsonObject["results"][0]["geometry"]["location"]["lng"];
                    double distance = await GetDistance(new PointInRoute(lat, lng), chargingStation, "driving");
                    RouteSegment r = new RouteSegment(new PointInRoute(lat, lng), distance);
                    r.Name = jsonObject["results"][0]["vicinity"].ToString()+" "+kategory;
                    Console.WriteLine(r.Name + " " + kategory + " " +r.Distance);
                    if (r.Name == "Israel" + " " + kategory)
                        return null;
                    return r;
                }



                else
                {
                    throw new HttpRequestException($"Failed to get response. Status code: {response.StatusCode}");
                }
            }

        }

        public  async Task<PointInRoute[]> GetElectricStationsAlongRoute(string origin, string destination, double segmentLength)
        {
            try
            {
                // Call GetRoutePoints asynchronously
                var routePoints = await GetRoutePoints(origin, destination);

                // Check if routePoints is not null
                if (routePoints != null && routePoints.Length > 0)
                {
                    // Call DecomposeRoute method
                    var routeSegmentsTask = DecomposeRoute(routePoints, segmentLength);

                    // Wait for DecomposeRoute task to complete and get the result
                    var routeSegments = await routeSegmentsTask;

                    // Check if routeSegments is not null
                    if (routeSegments != null && routeSegments.Length > 0)
                    {
                        // Select points for charging
                        var chosenPoints = PointForCharging(routeSegments,segmentLength);

                        // Get the nearest electric stations for the selected points
                        var stations = await GetNearestElectricStations(chosenPoints);

                        // Return the array of stations
                        return stations;
                    }
                    else
                    {
                        throw new Exception("No route segments found.");
                    }
                }
                else
                {
                    throw new Exception("No route points found for the given route.");
                }
            }
            catch (Exception ex)
            {
                throw new Exception($"An error occurred: {ex.Message}");
            }
        }
        public (RouteSegment[], double) KategoryLocation(Hashtable[] arr, int i, List<string> kategory, double sum, RouteSegment[] route)
        {
            if (i == arr.Length)
            {
                return (route.ToArray(), sum);
            }

            List<string> copy = new List<string>(kategory);
            while (kategory.Count > 0)
            {
                string current = kategory[0];
                Console.WriteLine(kategory[0]+" "+ i+ "kategory and i");
                if (arr[i][current] != null)
                {
                    route[i] = (RouteSegment)arr[i][current];
                    copy.Remove(current);
                    kategory.Remove(current);
                    //Console.WriteLine(i + " : " + sum + "chosen :" + route[i].Distance);
                    (RouteSegment[] a, double newSum) = KategoryLocation(arr, i + 1, new List<string>(copy), sum + route[i].Distance, route);
                    copy.Add(current);
                    if (newSum < minSum)
                    {
                        minSum = newSum;
                        MinArr = a;
                    }
                    if (i == 0)
                    {
                        Console.WriteLine("minsum :" + minSum);
                    }
                }
                else
                {

                    route[i] = null;
                    copy.Remove(current);
                    kategory.Remove(current); // Remove the invalid key from 'kategory'
                    (RouteSegment[] a, double newSum) = KategoryLocation(arr, i + 1, new List<string>(copy), sum + 100000, route);
                    if (newSum < minSum)
                    {
                        minSum = newSum;
                        MinArr = a;
                    }
                    copy.Add(current);

                }
            }
          
            return (MinArr.ToArray(), minSum);
        }
        public async Task<Hashtable> KategoryHashtableBuilderAsync(PointInRoute p, string[] arr)
        {
            Hashtable hashtable = new Hashtable();
            for (int i = 0; i < arr.Length; i++)
            {
                if (!hashtable.ContainsKey(arr[i]))
                {
                    try
                    {
                        var kateg = await GetNearestBy(p, arr[i]);
                        hashtable.Add(arr[i], kateg);

                    }
                    catch
                    {

                    }
                }
            }
            return hashtable;
        }

        public  async Task<Hashtable[]> ArrayHashtableBuilder(PointInRoute[] p, string[] kategory)
        {
            Hashtable[] heapArr = new Hashtable[p.Length - 1];
            for (int i = 0; i < p.Length - 1; i++)
            {
                heapArr[i] = await KategoryHashtableBuilderAsync(p[i], kategory);
            }
            return heapArr;
        }
        public async Task<RouteSegment[]> getRestPoint(PointInRoute[] stations, string[] kategories)
        {
            var dicts = await ArrayHashtableBuilder(stations, kategories);
            (RouteSegment[] r, double s) = KategoryLocation(dicts, 0, kategories.ToList(), 0.0, new RouteSegment[dicts.Length]);
            return r;
        }

    }
}
