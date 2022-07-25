import React from 'react'
import GoogleMapReact from 'google-map-react';
import {Paper,Typography,useMediaQuery} from '@material-ui/core';
import LocationOnOutlinedIcon  from '@material-ui/icons/LocationOnOutlined';
import Rating from '@material-ui/lab/Rating';
import useStyle from './style';
import { useState } from 'react';
import mapStyles from './mapStyles';

const Map = ({setCoordinates, setBounds, coordinates,places, setChildClicked,weatherData}) => {
    const classes = useStyle()
    const isDesktop = useMediaQuery('(min-width:600px)')
// const [childClicked,setChildClicked] = useState()

  return (
    <div className={classes.mapContainer}>
        <GoogleMapReact
        bootstrapURLKeys={{key: 'AIzaSyA8txAFaMNAl3UwTuAK_8kSBW6kh0pfuKM'}}
        defaultCenter = {coordinates}
        defaultZoom={14}
        margin={[50,50,50,50]}
         options={{disableDefaultUI:true,zoomControl:true,styles:mapStyles}}
         onChange={(e)=>{
          setCoordinates({lat:e.center.lat, lng: e.center.lng})
          setBounds({ne: e.marginBounds.ne, sw:e.marginBounds.sw})
          console.log(e)}
        }
         onChildClick={(child)=>{
          console.log(child)
          setChildClicked(child)
         }}
        >
            {places?.map((place,i)=>(
              <div
              className={classes.markerContainer}
              lat={Number(place.latitude)}
              lng={Number(place.longitude)}
              key={i}
              >
                  {!isDesktop ? (<LocationOnOutlinedIcon color='primary'/>) :  ( <Paper elevation={3} className={classes.paper}>
                  <Typography className={classes.typography} variant="subtitle2" gutterBottom> {place.name}</Typography>
                  <img
                    className={classes.pointer}
                    src={place.photo ? place.photo.images.large.url : 'https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg'}
                  alt={place.name}
                  />
                  <Rating name="read-only" size="small" value={Number(place.rating)} readOnly />
                </Paper>)}
              </div>
            ))}
            {weatherData?.list?.map((datas,i)=>(
              <div key={i} lat={datas.coord.lat} lng={datas.coord.lon}>
<img height={100} src={`http://openweathermap.org/img/w/${datas.weather[0].icon}.png`} alt="" srcset="" />
              </div>
            ))}
        </GoogleMapReact>
    </div>
  )
}

export default Map