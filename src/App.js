import {CssBaseline, Grid} from "@material-ui/core";
import Header from "./components/Header/Header";
import List from "./components/List/List";
import Map from "./components/Map/Map";
import {getPlacesData} from "./api";
import {useEffect, useState} from "react";
import {getWeatherData} from "./api/index"


function App() {

  const [places, setPlaces] = useState([])
  const [filteredPlaces, setFilteredPlaces] = useState([]);
  const [coords, setCoords] = useState({})
  const [bounds, setBounds] = useState({})
  const [child, setChild] = useState(null);
  const [loading, setLoading] = useState(false);
  const [type, setType] = useState('restaurants')
  const [rating, setRating] = useState('')
  const [weather, setWeather] = useState([]);


  useEffect(()=>{
    navigator.geolocation.getCurrentPosition(({coords: {latitude, longitude}})=>{
      setCoords({lat: latitude, lng: longitude})
    })
  }, [])

  useEffect(() => {
    const filtered = places.filter((place) => Number(place.rating) > rating);

    setFilteredPlaces(filtered);
  }, [rating]);
  

  useEffect(() => {

    if(bounds.sw && bounds.ne) {


      setLoading(true)
      getWeatherData(coords.lat, coords.lng).then((data)=>setWeather(data))
      getPlacesData(type, bounds.sw, bounds.ne).then((data) => {
        setPlaces(data?.filter((place) => place.name && place.num_reviews > 0))
        setFilteredPlaces([])
        setLoading(false)
      });
    }

  }, [type, bounds]);

  return (
    <div className="App">
      <CssBaseline/>
        <Header setCoords={setCoords}/>
        <Grid container spacing={3} style={{width: "100%"}}>
          <Grid item xs={12} md={4}>
            <List places={filteredPlaces.length ? filteredPlaces : places} child={child} loading={loading} type={type} setType={setType} rating={rating} setRating={setRating} />
          </Grid>
          <Grid item xs={12} md={8}>
            <Map setCoords={setCoords} setBounds={setBounds} coords={coords} places={filteredPlaces.length ? filteredPlaces : places} setChild={setChild} weather={weather}/>
          </Grid>
        </Grid>

    </div>
  );
}

export default App;
