import React, { useContext, useEffect, useState } from "react";
import "./SearchCity.css";
import { WeatherApi } from "./context/WeatherApi";
import MoreDetails from "./MoreDetails";
import CityWeather from "./CityWeather";
import SearchNSugg from "./SearchNSugg";

// This component for code related to Today weather
// This componet have

const SearchCity = () => {
  // List of suggested cities for search
  const suggestionCity = [
    {
      id: 1,
      city: "Bengaluru",
    },
    {
      id: 2,
      city: "Delhi",
    },
    {
      id: 3,
      city: "Mumbai",
    },
    {
      id: 4,
      city: "Kolkata",
    },
    {
      id: 5,
      city: "Chennai",
    },
  ];

  // Destructuring context functions and state variables from WeatherApi context
  const {
    searchByCityName,
    formatSearchCityData,
    searchByLonAndLat,
    formatForcastData,
    formatToLocalTime,
    setWetherInfoNForcase,
    weatherInfoNForcast,
    degreeUnit,
  } = useContext(WeatherApi);

  // State to store the current search city
  const [searchCity, setSearchCity] = useState("Bengaluru");

  // Function to fetch weather data from the API based on the selected city

  async function searchDataFromApi(city = searchCity) {
    // Fetch current weather data
    var weatherInfo = await searchByCityName(city);

    // Check if the API response is successful
    if (weatherInfo.cod == 200) {
      // Format and set the current weather data
      weatherInfo = formatSearchCityData(weatherInfo);

      // Fetch and format forecast weather data
      const forcastWeather = await searchByLonAndLat(
        weatherInfo.lon,
        weatherInfo.lat
      ).then((data) => formatForcastData(data));

      // Set combined weather information and forecast

      setWetherInfoNForcase({
        ...weatherInfo,
        ...forcastWeather,
        dateTime: formatToLocalTime(weatherInfo.dt, forcastWeather.timezone),
        sunSet: formatToLocalTime(
          weatherInfo.sunSet,
          forcastWeather.timezone,
          "hh:mm a"
        ),
        sunRise: formatToLocalTime(
          weatherInfo.sunRise,
          forcastWeather.timezone,
          "hh:mm a"
        ),
      });
    } else {
      alert(`${city} - ${weatherInfo.message}`);
    }
  }

  // Effect to re-fetch data when the degree unit changes
  useEffect(() => {
    searchDataFromApi();
  }, [degreeUnit]);

  return (
    <div>
      {/* Component for search input and suggestions */}
      <SearchNSugg
        suggestionCity={suggestionCity}
        setSearchCity={setSearchCity}
        searchDataFromApi={searchDataFromApi}
      />
      {/* Component for displaying current weather information */}
      <CityWeather
        setSearchCity={setSearchCity}
        weatherInfoNForcast={weatherInfoNForcast}
      />
      {/* Component for displaying additional weather details */}
      <MoreDetails weatherInfoNForcast={weatherInfoNForcast} />
    </div>
  );
};

export default SearchCity;
