import React from 'react';
import ForecastDaily from './../forecastdaily/ForecastDaily';

export default function Forecast(props) {
  if (props.isDaily) {

const options = { weekday: 'long' };
    const dailyItems = props.data.reduce((dayArray, value) => {
      // First day.
      if (dayArray.length === 0) {
        return [{
          date: new Date(value.dt * 1000).toLocaleDateString(undefined, options),
           maximum: value.main.temp_max,
          minimum: value.main.temp_min,
          icon: `http://openweathermap.org/img/wn/${value.weather[0].icon}@2x.png`,
          description: value.weather[0].description
        }];
      }

      const lastElement = dayArray[dayArray.length - 1];
      const currentDate = new Date(value.dt * 1000).toLocaleDateString(undefined, options);
      const maximum = value.main.temp_max;
      const minimum = value.main.temp_min;
     


      // Still the same day.
      if (lastElement.date === currentDate) {
        const element = {
          date: currentDate,
          maximum: Math.max(maximum, lastElement.maximum),
          minimum: Math.min(minimum, lastElement.minimum),
          icon: maximum > lastElement.maximum
            ? `http://openweathermap.org/img/wn/${value.weather[0].icon}@2x.png`
            : lastElement.icon,
          description: maximum > lastElement.maximum
            ? value.weather[0].description
            : lastElement.description
        }

        return [...dayArray.slice(0, -1), element];
      }

      // New day.
      return [...dayArray, {
        date: currentDate,
        maximum,
        minimum,
        icon: `http://openweathermap.org/img/wn/${value.weather[0].icon}@2x.png`,
        description: value.weather[0].description
      }];
    }, []);

    return (
      <>
        {
          dailyItems.map(item => (
            <ForecastDaily
              key={item.date}
              isMetric={props.isMetric}
              maximum={item.maximum}
              minimum={item.minimum}
              date={item.date}
              icon={item.icon}
              description={item.description} />
          ))
        }
      </>
    );
  }

  
}
