import React, { useContext } from "react";
import { WeatherApi } from "./context/WeatherApi";
import "./ForeCast.css";

// This component for displaying daily weather forecast details
const DailyForcast = (props) => {
  const { date, icon, temp, description } = props.item;
  const { degreeUnit } = useContext(WeatherApi);

  return (
    <div className="forcast-detail">
      {/* Display date */}
      <p>{date}</p>
      {/* Display weather icon */}
      <img src={icon} alt="img" />
      {/* Display weather description */}
      <p className="forcast-des">{description}</p>
      {/* Display temperature with unit based on the selected degree unit */}
      <p>
        {temp}º {degreeUnit == "metric" ? <sup> c</sup> : <sup> f</sup>}
      </p>
    </div>
  );
};

export default DailyForcast;
