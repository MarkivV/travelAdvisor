import {CssBaseline, Grid} from "@material-ui/core";
import Header from "./components/Header/Header";
import List from "./components/List/List";
import Map from "./components/Map/Map";
import {getPlacesData} from "./api";
import {useEffect, useState} from "react";


function App() {

  const [places, setPlaces] = useState([])
  const [coords, setCoords] = useState({})
  const [bounds, setBounds] = useState(null)

  useEffect(()=>{
    navigator.geolocation.getCurrentPosition(({coords: {latitude, longitude}})=>{
      setCoords({lat: latitude, lng: longitude})
    })
  }, [])

  useEffect(() => {
    getPlacesData(bounds.sw, bounds.ne).then((data) => {setPlaces(data)});
  }, [coords, bounds]);

  return (
    <div className="App">
      <CssBaseline/>
        <Header/>
        <Grid container spacing={3} style={{width: "100%"}}>
          <Grid item xs={12} md={4}>
            <List places={places}/>
          </Grid>
          <Grid item xs={12} md={8}>
            <Map setCoords={setCoords} setBounds={setBounds} coords={coords}/>
          </Grid>
        </Grid>

    </div>
  );
}

export default App;
