import { GoogleMap, DirectionsRenderer, Marker } from '@react-google-maps/api';
import CircularProgress from '@mui/material/CircularProgress';
import Drawer from './drawer'
import { useState, useRef, useCallback, useEffect } from "react"
import { Autocomplete } from '@react-google-maps/api';
import { getChargingPoints } from '../../service/algorithm'
import { Car } from "../../types/type"
import { selectKmByCarId } from "../../redux/staticCar/staticCarSelector"
import { useAppSelector } from '../../redux/store/store';
import KategorysComboBox from '../HomeScreen/kategoryComboBox';
import Container from '@mui/material/Container';
import CardList from './cardList'
const containerStyle = {
  width: '100%',
  height: '470px',
};

const defaultCenter = {
  lat: 32.073954,
  lng: 34.836038,
};

interface Pos {
  lat: number;
  lng: number;
}


type MapType = google.maps.Map;

interface MyComponentProps {
  googleMapsApiKey: string;
}

export default function MyComponent(googleMapsApiKey: MyComponentProps) {
  const [origin, setOrigin] = useState<Pos | null>(null);
  const [destination, setDestination] = useState<Pos | null>(null);
  const [originName, setOriginName] = useState<string | null>(null)
  const [destinationName, setDestinationName] = useState<string | null>(null)
  const [selectedCar, setSelectedCar] = useState<Car | null | undefined>(null)
  const [directions, setDirections] = useState<google.maps.DirectionsResult | null | undefined>(null);
  const [directionRenderer, setDirectionRenderer] = useState<google.maps.DirectionsRenderer | null | undefined>(null);
  const [chargePointsArray, setChargePointsArray] = useState<Pos[] | null>(null)
  const originAutocomplete = useRef<google.maps.places.Autocomplete>();
  const destinationAutocomplete = useRef<google.maps.places.Autocomplete>();
  const [mapElement, setMapElement] = useState<MapType | null>(null);
  const staticCar = useAppSelector(selectKmByCarId(selectedCar?.staticCarId))
  const [selectedKategory, setSelectedKategory] = useState<string[]>([])
  const [restPoints, setRestPoints] = useState<{ point: { lat: number, lng: number }, distance: number, name: string }[]>([])
  const [loading, setLoading] = useState(false);
  const [flag, setFlag] = useState(false)
  const handleDirectionsChanged = () => {
    if (directionRenderer) {
      directionRenderer.setMap(null);
    }
  };


  const handleFavoriteSelect = (lat1: number, lng1: number, isOrigin: boolean, name: string) => {
    try {
      const selectedPos = {
        lat: lat1 || 0,
        lng: lng1 || 0,
      };
      if (isOrigin) {

        setOrigin(selectedPos);


        setDirections(null);
        setChargePointsArray(null)
        if (name) {
          setOriginName(name)
        }
      }
      else {

        setDestination(selectedPos);

        setDirections(null)
        setChargePointsArray(null)
        if (name) {
          setDestinationName(name)
        }
      }
    }
    catch {
      console.log("bad auto complete")
    }
  }
  // Function to handle Autocomplete place selection
  const handlePlaceSelect = (place: google.maps.places.PlaceResult, isOrigin: boolean) => {
    try {
      const selectedPos = {
        lat: place.geometry?.location?.lat() || 0,
        lng: place.geometry?.location?.lng() || 0,
      };
      if (isOrigin) {
        setOrigin(selectedPos);
        setDirections(null);
        setChargePointsArray(null)
        setRestPoints([])
        directionRenderer?.setMap(null)
        if (place.name) {
          setOriginName(place.name)
        }
      }
      else {
        setDestination(selectedPos);
        setDirections(null)
        setChargePointsArray(null)
        setRestPoints([])
        directionRenderer?.setMap(null)
        mapElement?.unbindAll()
        if (place.name) {
          setDestinationName(place.name)
        }
      }
    }
    catch {
      console.log("bad auto complete")
    }
  };
  const HandleSelectedCar = (e: Car | null | undefined) => {
    try {
        setSelectedCar(e)
    }
    catch {
      alert('an error occurd')

    }
  }
  const onLoad = useCallback((map: MapType) => {
    try {
      setMapElement(map);
    }
    catch {
      alert('an error occurd')
    }
  }, []);

  const HandleSelectedKategory = (e: string[]) => {
    try {
      setSelectedKategory(e)
    }
    catch {
      alert('an error occurd')
    }
  }
  useEffect(() => {
    if (loading == false && chargePointsArray)
      setFlag(true)
    if (loading == true)
      setFlag(false)

  }, [loading])


  useEffect(() => {

    const fetchData = async () => {
      if(selectedCar==null&&origin&&destination)
        {
          alert("You have to insert a new car in self zone cars");
        } 

      if (origin && destination && origin.lat === destination.lat && origin.lng === destination.lng) {
        alert("the direction isnot correct")
      }
      else {
        const directionsService = new google.maps.DirectionsService();
        if (origin && destination && destinationName && originName && selectedCar) {
          const km = staticCar?.km
          setLoading(true); // הגדרת הטעינה למצב פעיל

          const chargePoints = await getChargingPoints(originName, destinationName, (Number)(km))


          const waypoint = chargePoints.map((point: { lat: number | google.maps.LatLng | google.maps.LatLngLiteral; lng: number | boolean | null | undefined; }) => {


            return { lat: point.lat, lng: point.lng };

          });
          const waypointArray = waypoint.map((point: any) => ({
            location: new google.maps.LatLng(point.lat, point.lng),
            stopover: false // e if all waypoints are not stopsSet stopover to fals
          }));

          directionsService.route(
            {
              destination: new google.maps.LatLng(destination!.lat, destination!.lng),
              origin: new google.maps.LatLng(origin!.lat, origin!.lng),
              waypoints: waypointArray,
              travelMode: google.maps.TravelMode.DRIVING
            },
            (result, status) => {
              if (status === google.maps.DirectionsStatus.OK) {

                setChargePointsArray(chargePoints)
                setDirections(result);
                setLoading(false); // משנה את מצב הטעינה ללא פעיל



              } else {
                console.error("error fetching directions", result, status);
                setLoading(false); // משנה את מצב הטעינה ללא פעיל
              }
            }
          );
        }
      }
    }
    fetchData()
  }, [destination, origin, selectedCar])

  const greenIcon = {
    url: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png', // URL של תמונת אייקון ירוקה
    scaledSize: new window.google.maps.Size(30, 30), // גודל האייקון
  };

  return (
    <>

      <div>
        {loading ? (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <CircularProgress />
          </div>
        ) : (
          <div>
            <GoogleMap
              mapContainerStyle={containerStyle}
              center={defaultCenter}
              zoom={11}
              onLoad={onLoad}
            >
              {flag && chargePointsArray && chargePointsArray.map((point: any, index: number) =>
                (<Marker key={index} position={point} label="chargePoint" />))}

              {flag && restPoints.map(point => (
                point !== null && <Marker position={point.point}
                  label={point.name}
                  icon={greenIcon}
                />
              ))}

              {directions && (
                <DirectionsRenderer
                  directions={directions}
                  onDirectionsChanged={handleDirectionsChanged}
                  onLoad={(directionRenderer) => setDirectionRenderer(directionRenderer)}
                />
              )}


              <Autocomplete
                onLoad={(autocomplete) => {
                  originAutocomplete.current = autocomplete;
                }}
                onPlaceChanged={() =>
                  handlePlaceSelect(
                    originAutocomplete.current?.getPlace()!,
                    true
                  )
                }
              >

                <input
                  type="text"
                  placeholder={originName ? originName : "Origin"}
                  style={{
                    marginTop: '1%',
                    boxSizing: `border-box`,
                    border: `1px solid transparent`,
                    width: `200px`,
                    height: `32px`,
                    padding: `0 12px`,
                    borderRadius: `3px`,
                    boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
                    fontSize: `14px`,
                    outline: `none`,
                    textOverflow: `ellipses`,
                    right: '40%',
                    marginRight: '0%',
                    position: 'absolute'
                  }}
                />
              </Autocomplete>

              <Autocomplete
                onLoad={(autocomplete) => {
                  destinationAutocomplete.current = autocomplete;
                }}
                onPlaceChanged={() =>
                  handlePlaceSelect(
                    destinationAutocomplete.current?.getPlace()!,
                    false
                  )
                }
              >
                <input
                  type="text"
                  placeholder={destinationName ? destinationName : "Destination"}
                  style={{
                    marginTop: '4%',
                    boxSizing: `border-box`,
                    border: `1px solid transparent`,
                    width: `200px`,
                    height: `32px`,
                    padding: `0 12px`,
                    borderRadius: `3px`,
                    boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
                    fontSize: `14px`,
                    outline: `none`,
                    textOverflow: `ellipses`,
                    right: '40%',
                    marginRight: '0%',
                    position: 'absolute'
                  }}
                />
              </Autocomplete>

            </GoogleMap>
            {restPoints && restPoints.length != 0 && <CardList items={restPoints} />}
            {chargePointsArray && chargePointsArray?.length > 1 && restPoints.length == 0 && (
              <Container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <KategorysComboBox selectedKategory={selectedKategory} setSelectedKategory={HandleSelectedKategory} setRestPoints={setRestPoints} chargePoints={chargePointsArray} setLoading={setLoading} />
              </Container>
            )}


            <Drawer handleFavoriteSelect={handleFavoriteSelect} handlePlaceSelect={handlePlaceSelect} HandleSelectedCar={HandleSelectedCar} selectedCar={selectedCar} />
          </div>
        )}
      </div>

    </>
  );
};


