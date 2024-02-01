import React, { useContext, useEffect } from "react";
import { WeatherApi } from "./context/WeatherApi";
import "./SearchCity.css";


const CityWeather = ({ weatherInfoNForcast, setSearchCity }) => {
  

   // Effect to update the search city when weather information changes
    useEffect(() => {
      // If weather information is available, set the search city
      if (weatherInfoNForcast.city) {
        setSearchCity(weatherInfoNForcast.city);
      }
    }, [weatherInfoNForcast]);

  // Extract city information from the props
  const cityInfo = weatherInfoNForcast;

  // Use WeatherApi context to get and update degree unit
  const { degreeUnit, setDegreeUnit } = useContext(WeatherApi);

  // Handler function to change the degree unit
  function changeDegreeHandler(newSet) {
    // Check if the selected degree unit is different from the current one
    if (degreeUnit != newSet) {
 
      setDegreeUnit(newSet);
    }
  }

  return (
    <div>
      {/* Display date, time, and city name */}
      <div className="data-time-div">
        <p className="city-data">
          {cityInfo.dateTime}
          {}
        </p>
        <p className="city-name-p">{cityInfo.city}</p>
      </div>
      {/* Buttons to switch between Celsius and Fahrenheit */}
      <div className="cel-fehin-div">
        <button
          className="cel-to-feh"
          onClick={() => {
            changeDegreeHandler("metric");
          }}
        >
          {" "}
          ºC{" "}
        </button>
        <div className="line"></div>
        <button
          className="cel-to-feh"
          onClick={() => {
            changeDegreeHandler("imperial");
          }}
        >
          ºF
        </button>
      </div>
      {/* Display temperature, icon, and weather description */}
      <div className="temp-div">
        <img className="temp-img" src={cityInfo.icon} alt="weather" />

        <div>
          <p className="city-temp-p">
            {cityInfo.temp}
            {degreeUnit == "metric" ? <sup>ºc</sup> : <sup>ºf</sup>}{" "}
          </p>

          <p className="weather-des">{cityInfo.description}</p>
        </div>
      </div>
    </div>
  );
};

export default CityWeather;
