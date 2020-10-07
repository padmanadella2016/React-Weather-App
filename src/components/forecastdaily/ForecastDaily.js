import React from 'react';

export default function ForecastDaily(props) {
  let maximum = Math.round(props.maximum);
  let minimum = Math.round(props.minimum);

  if (!props.isMetric) {
    maximum = Math.round((maximum * 9) / 5 + 32);
    minimum = Math.round((minimum * 9) / 5 + 32);
  }

  return (
    <div className='col-2'>
      <div>
        <p>{props.date}</p>
        <img src={props.icon} alt={props.description} />
        <p><span className='largeValue'>{maximum}</span> {props.isMetric ? "˚C" : "˚F"} </p>
        <p>{minimum} {props.isMetric ? "˚C" : "˚F"}</p>
        </div>
    </div>
  );
}
