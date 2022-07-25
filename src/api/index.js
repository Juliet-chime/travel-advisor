import axios from "axios";

const url = 'https://travel-advisor.p.rapidapi.com/restaurants/list-in-boundary'


export const getPlacesData = async (type,sw,ne) => {
    try {
const {data:{data}} = await axios.get(`https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`,{
  params: {
    bl_latitude: sw.lat,
    tr_latitude: ne.lat,
    bl_longitude: sw.lng,
    tr_longitude: ne.lng,
  },
  headers: {
    'X-RapidAPI-Key':process.env.RAPID_API_KEY,
    'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com'
  }
})
return data
    } catch {}
}

export const getWeatherData = async (lat,lon) => {
  try{
  const {data} = await axios.get('https://community-open-weather-map.p.rapidapi.com/weather',{
    params: {
      lat,
      lon
    },
    headers: {
      'X-RapidAPI-Key': process.env.RAPID_API_KEY,
      'X-RapidAPI-Host': 'community-open-weather-map.p.rapidapi.com'
    }
  })
  return data
  }catch{
  
  }
  }

// export default {getPlacesData, getWeatherData}





