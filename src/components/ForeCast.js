import React, { useContext } from "react";
import "./ForeCast.css";
import HourlyForcast from "./HourlyForcast";
import DailyForcast from "./DailyForcast";
import { WeatherApi } from "./context/WeatherApi";

// This component for displaying weather forecast
const ForeCast = () => {
  const { weatherInfoNForcast } = useContext(WeatherApi);

  // Extract hourly and daily forecast data
  const hourly = weatherInfoNForcast.hourly;
  const daily = weatherInfoNForcast.daily;

  return (
    <div className="forecase">
      {/* Display Hourly Forecast section */}

      <p className="forcast-heading">HOURLY FORECAST</p>
      <hr />
      <div className="hourly-forcast-div">
        {
          // Map through hourly forecast data and render
          hourly &&
            hourly.map((item) => <HourlyForcast key={item.date} item={item} />)
        }
        {
          // Display message if no response is received
          !hourly && (
            <div>
              <p>No resopone from Weather Forcast Api</p>
            </div>
          )
        }
      </div>

      {/* Display Daily Forecast section */}

      <p className="forcast-heading">DAILY FORECAST</p>
      <hr />

      <div className="hourly-forcast-div">
        {
          // Map through daily forecast data and render
          daily &&
            daily.map((item) => <DailyForcast key={item.date} item={item} />)
        }
        {
          // Display message if no response is received
          !daily && (
            <div>
              <p>No resopone from Weather Forcast Api</p>
            </div>
          )
        }
      </div>
    </div>
  );
};

export default ForeCast;
