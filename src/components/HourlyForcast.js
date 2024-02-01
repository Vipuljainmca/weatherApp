import React, { useContext } from "react";
import { WeatherApi } from "./context/WeatherApi";
import "./ForeCast.css";
  

//This component for displaying hourly weather forecast details
const HourlyForcast = (props) => {
  const { date, icon, temp, description } = props.item;
  const { degreeUnit } = useContext(WeatherApi);

  return (
    <div className="forcast-detail">
      {/* Display time */}
      <p>{date}</p>
      {/* showing related icon */}
      <img src={icon} alt="img" />
      {/* Showing weather description */}
      <p className="forcast-des">{description}</p>
      {/* Display temperature with degree */}
      <p>
        {temp}º{degreeUnit == "metric" ? <sup> c</sup> : <sup> f</sup>}
      </p>
    </div>
  );
};

export default HourlyForcast;
