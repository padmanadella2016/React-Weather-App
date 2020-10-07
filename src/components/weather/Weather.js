import React from 'react';

export default function Weather(props) {
  let temperature = Math.round(props.temperature);
  let wind = props.wind;

  if (!props.isMetric) {
    temperature = Math.round((temperature * 9) / 5 + 32);
    wind = Math.round(wind * 2.237);  
  }

  return (
    <>
      <div className='col city'>
        <h1>{props.city}</h1>
               <p>{props.time}</p>
        {<p>{props.description}</p> }
      
        <img src={props.icon} alt={props.description} />
        <span className='mainTemperature'>{temperature}</span> {props.isMetric ? "˚C" : "˚F"}
        <span>
          <button
            className="temperatureButton"
            onClick={props.onToggleIsMetric}
          >
            {props.isMetric ? "˚F" : "˚C"}
          </button>{" "}
        </span>
      </div>
      <div className='col data'>
        <p>Humidity: <span className='largeValue'>{props.humidity}</span> %</p>
        <p>Wind: <span className='largeValue'>{wind}</span> {props.isMetric ? "m/s" : "mph"}</p>
      </div>
    </>
  )
}
