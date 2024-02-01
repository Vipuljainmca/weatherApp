import React, { useContext } from 'react';
import './SearchCity.css';
import {  FaArrowUp, FaArrowDown, FaWind } from "react-icons/fa";
import { IoMdSunny } from "react-icons/io";
import { TbSunset2 } from "react-icons/tb";
import { CiDroplet, CiTempHigh } from "react-icons/ci";
import { GrDirections } from "react-icons/gr";
import { WeatherApi } from './context/WeatherApi';



//  This for displaying additional weather details
const MoreDetails = (props) => {
    const cityInfo = props.weatherInfoNForcast
    const{degreeUnit} = useContext(WeatherApi)

    
  return (
    <div>
       {/* Display additional weather details */}
       <div  className='weather-details' >
            <div>
            <p className='nrml-para'><IoMdSunny/><b>Rise: </b>&nbsp; {cityInfo.sunRise} </p>
            <p className='nrml-para'><b><CiTempHigh/>Feel like:</b>&nbsp;  {cityInfo.fellLike}º{ degreeUnit=='metric'?<sup> c</sup> : <sup> f</sup> }  </p>
            <p className='nrml-para'><FaArrowUp/> <b>Max temp: &nbsp;</b>{cityInfo.high} º{ degreeUnit=='metric'?<sup> c</sup> : <sup> f</sup> } </p>
            <p className='nrml-para'><FaWind/> <b>Wind speed:&nbsp; </b>{cityInfo.speed}km/h </p>

            </div>
            <div>
            <p  className='nrml-para' ><TbSunset2/> <b>Set:</b>&nbsp;  {cityInfo.sunSet} </p>
            <p  className='nrml-para' ><CiDroplet/><b>Humidity:</b>&nbsp;  {cityInfo.humidity}% </p>
            <p  className='nrml-para' ><FaArrowDown/> <b>Min temp:</b>&nbsp; {cityInfo.low} º{ degreeUnit=='metric'?<sup> c</sup> : <sup> f</sup> } </p>
            <p  className='nrml-para' ><GrDirections/><b>Wind direction:</b>&nbsp;  {cityInfo.direction} </p>
            </div>
        </div>
    </div>
  )
}

export default MoreDetails
