import { createContext , useState} from "react";
import {DateTime} from 'luxon';


// Create a context for the Weather API functionalities
export const WeatherApi = createContext()


// API key and base URL for OpenWeatherMap API
const url = "https://api.openweathermap.org/data/2.5/"
const apiKey = "e0a7d92bdacf73b7938a9d331158fcce"


// Provider component for managing Weather API state and functions

export default function WeatherApiProvider({children}){
// url + q=cityName + &appid= ApiKey

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


const formatToLocalTime = (secs, offsetSeconds, format = "cccc, dd LLL yyyy ' | Local time : ' hh:mm a") => {
  // Checking secs and offsetSeconds are numbers
  if (typeof secs === 'number' && !isNaN(secs) && typeof offsetSeconds === 'number' && !isNaN(offsetSeconds)) {
      // Convert seconds to minutes for Luxon offset
      const offsetMinutes = offsetSeconds / 60;

      // Create a UTC-based DateTime object
      const utcDateTime = DateTime.fromSeconds(secs).toUTC();

      // Check if offsetMinutes is a valid number
      if (!isNaN(offsetMinutes)) {
          // Apply the offset
          const localDateTime = utcDateTime.plus({ minutes: offsetMinutes });

          // Format the local date and time
          return localDateTime.toFormat(format);
      } else {
          console.log("Invalid offsetMinutes");
          return null;
      }
  } else {
      console.log("Invalid secs or offsetSeconds");
      return null;
  }
};


    
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
        
        const forcastData = await fetch(`${url}forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${degreeUnit}`)
        const forcastDataRes = await forcastData.json()
        return forcastDataRes
    }

    // Function to format forecast (daily & hourly) data for display
    function formatForcastData(forcastData){
        
        var { list } = forcastData

        const timezone = forcastData.city.timezone

        if(list){
        var  daily = [list[7],list[15],list[23],list[31],list[39]]
          daily = daily.map((data,index)=>{
            return{
              date : formatToLocalTime(data.dt,timezone,"dd LLL"),
              temp :  data.main.temp,
              icon : iconLink(data.weather[0].icon),
              description : data.weather[0].main,
              id : index
            }
          })

        }

        return {daily, timezone }
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