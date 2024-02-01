import { createContext , useState} from "react";
import {DateTime} from 'luxon';


// Create a context for the Weather API functionalities
export const WeatherApi = createContext()


// API key and base URL for OpenWeatherMap API
const url = "https://api.openweathermap.org/data/2.5/"
const apiKey = "e0a7d92bdacf73b7938a9d331158fcce"

// const forecastUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=22.5697&lon=88.3697&appid=1fa9ff4126d95b8db54f3897a208e91c";
const forcastApiKey = '1fa9ff4126d95b8db54f3897a208e91c'


// Provider component for managing Weather API state and functions

export default function WeatherApiProvider({children}){
// url + q=cityName + &appid= ApiKey
// url + onecall?lat={22.5697}&lon={88.3697}&exclude={part}&appid={}

//State to store weather information and forecast data 
// & second for degree unit
const [weatherInfoNForcast, setWetherInfoNForcase] = useState({});
const[ degreeUnit, setDegreeUnit ] = useState('metric')


// Function to get the wind direction based on degrees
function getDirection(degree) {
    degree = (degree % 360 + 360) % 360;
    if (degree >= 337.5 || degree < 22.5) {
      return "North";
    } else if (degree >= 22.5 && degree < 67.5) {
      return "Northeast";
    } else if (degree >= 67.5 && degree < 112.5) {
      return "East";
    } else if (degree >= 112.5 && degree < 157.5) {
      return "Southeast";
    } else if (degree >= 157.5 && degree < 202.5) {
      return "South";
    } else if (degree >= 202.5 && degree < 247.5) {
      return "Southwest";
    } else if (degree >= 247.5 && degree < 292.5) {
      return "West";
    } else {
      return "Northwest";
    }
  }


  // Function to format Unix timestamp to local time
  const formatToLocalTime =(
    secs,
    zone,
    format = "cccc, dd LLL yyyy ' | Local time : ' hh:mm a"
  )=>{ // checking secs is number or not 
     if(typeof secs === 'number' && !isNaN(secs)){
    return DateTime.fromSeconds(secs).setZone(zone).toFormat(format);
    }else{
        console.log("data and time error handler");
        return null;
      
    }
  }
    
  // Function to generate the URL for the weather icon

  const iconLink = (code) => `http://openweathermap.org/img/wn/${code}@2x.png`;

    // Function to search for weather data by city name
   async function searchByCityName(city){
        try{
        const data = await fetch(`${url}weather?q=${city}&appid=${apiKey}&units=${degreeUnit}`)
        const res = await data.json()
        return res
    }catch{
        alert("Network issue or Api bad request")
        return { cod: '404', message: 'City not found' };
    }
        
    }

  // Function to search for weather forcast hourly and daily data by latitude and longitude
    async function searchByLonAndLat(lon,lat){
        
        const forcastData = await fetch(`${url}onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,alerts&appid=${forcastApiKey}&units=${degreeUnit}`)
        const forcastDataRes = await forcastData.json()
        return forcastDataRes
    }

    // Function to format forecast (daily & hourly) data for display
    function formatForcastData(forcastData){
        
        var {daily,hourly, timezone} = forcastData
        // Format daily forecast data
        if(daily){
            daily = daily.slice(1,6).map((data)=>
            {return {
                date : formatToLocalTime(data.dt,timezone,"dd LLL"),
                temp : data.temp.day,
                icon :  iconLink(data.weather[0].icon),
                description : data.weather[0].main
            }}
            )
        }
  // Format hourly forecast data
        if(hourly){
            hourly = hourly.slice(1,6).map((data)=>
            {return {
                date : formatToLocalTime(data.dt,timezone, "hh:mm a"),
                temp : data.temp,
                icon : iconLink(data.weather[0].icon),
                description : data.weather[0].main
            }}
            )
        }


        return { 
            timezone,
            daily,
            hourly
        }
    }

    // Function to format current weather data for display

    function formatSearchCityData(data){

        return{
            city:   data.name,
            lon:    data.coord.lon,
            lat:     data.coord.lat,
            description:     data.weather[0].description,
            sunRise:    data.sys.sunrise,
            sunSet:  data.sys.sunset,
            temp:   data.main.temp,
            fellLike:    data.main.feels_like,
            humidity:   data.main.humidity,
            low:    data.main.temp_min,
            high:    data.main.temp_max,
            speed:  data.wind.speed,
            icon:   iconLink(data.weather[0].icon),
            dt : data.dt,
            dateTime: '',
            direction:   getDirection(data.wind.deg),
            
        }

    }

// Context value with state and functions


    const value = {
        searchByCityName,
        formatSearchCityData,
        searchByLonAndLat,
        formatForcastData,
        formatToLocalTime,
        setWetherInfoNForcase,
        weatherInfoNForcast,
        degreeUnit,
         setDegreeUnit,
    }

    return <WeatherApi.Provider value={value}>
        {children}
    </WeatherApi.Provider>
}