import logo from './logo.svg';
import { CssBaseline, Grid } from '@material-ui/core';
import './App.css';
import Header from './component/Header/Header';
import Map from './component/Map/Map';
import List from './component/List/List';
import {getWeatherData, getPlacesData} from './api/index'
// import getPlacesData from './api';
// import getWeatherData from './api';
import { useEffect, useState } from 'react';

function App() {
const [places, setPlaces] = useState([])
const [coordinates, setCoordinates] = useState({})
const [bounds, setBounds] = useState(null)
const [filteredPlaces, setFilteredPlaces] = useState([])

const [childClicked,setChildClicked] = useState()
const [loading,setLoading] = useState(false)

 const [type, setType] = useState('restaurant')
 const [rating, setRating] = useState('')
 const [weatherData, setWeatherData] = useState([])

useEffect(()=>{
  navigator.geolocation.getCurrentPosition((data)=>{
    setCoordinates({lat: data.coords.latitude, lng:data.coords.longitude})
  })
},[])

useEffect(()=>{
  const filteredPlaces = places.filter((place) => place.rating > rating)
  setFilteredPlaces(filteredPlaces)
},[rating])

  useEffect(()=> {
    if (bounds?.sw && bounds?.ne){

    setLoading(true)
    
    getWeatherData(coordinates.lat, coordinates.lng).then((data)=>setWeatherData(data)).catch(err => {})
  
  
      getPlacesData(type, bounds?.sw, bounds?.ne).then(res => {
     setPlaces(res?.filter((respond)=>respond.name && respond.num_reviews > 0))
     setFilteredPlaces([])
     setLoading(false)
     
   }).catch(err =>{

   })
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[type, bounds])
  return (
   <>
   <CssBaseline/>
   <Header setCoordinates={setCoordinates}/>

   <Grid container spacing={3} style={{width:'100%'}}>
<Grid item xs={12} md={4}>
  <List places={filteredPlaces.length ? filteredPlaces : places}
  childClicked={childClicked}
  loading={loading}
  rating={rating}
  setRating={setRating}
  type={type}
  setType={setType}
  />
</Grid>

<Grid item xs={12} md={8}>
  <Map
  setCoordinates={setCoordinates}
  setBounds={setBounds}
  coordinates={coordinates}
  places={filteredPlaces.length ? filteredPlaces : places}
  setChildClicked={setChildClicked}
  weatherData={weatherData}
  />
</Grid>

   </Grid>
   </>
  );
}

export default App;
