import React, { useState, useEffect } from 'react';
import Search from './components/search/Search';
import Weather from './components/weather/Weather';
import Forecast from './components/forecast/Forecast';
import axios from 'axios';
import './App.css';

export default function App() {
  const [city, setCity] = useState({ name: 'Melbourne', countrycode:'AU' });
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState([]);
  const [isMetric, setIsMetric] = useState(true);
  const [forecastDaily, setForecastDaily] = useState(true); 

  function handleSearch(city) {
    setCity({ name: city });
  }

  
  function handleToggleIsMetric() {
    setIsMetric(!isMetric);
  }

  function handleWeather(response) {
    const date = new Date(response.data.dt * 1000);
    const options = { weekday: 'long', month: 'long', day: 'numeric' };
    setWeatherData({
      city: response.data.name,
      countrycode: response.data.countrycode,
      time: `${date.toLocaleDateString('en-US', options)} `,
      temperature: response.data.main.temp,
      description: response.data.weather[0].description,
      humidity: response.data.main.humidity,
      realFeel: response.data.main.feels_like,
      wind: response.data.wind.speed,
      icon: `http://openweathermap.org/img/wn/${
        response.data.weather[0].icon
        }@2x.png`
    })
    
  }

  function handleForecast(response) {
    setForecastData(response.data.list);
    
  }


  useEffect(() => {
    const apiKey = `${process.env.REACT_APP_WEATHER_API_KEY}`;
    
    if (city.name) {
      const weatherApi = `https://api.openweathermap.org/data/2.5/weather?q=${city.name},${city.countrycode}&units=metric&appid=${apiKey}`;
      const forecastApi = `https://api.openweathermap.org/data/2.5/forecast?q=${city.name},${city.countrycode}&units=metric&appid=${apiKey}`;
     
      axios
        .get(weatherApi)
        .then(handleWeather)
        .catch(handleError);
      axios
        .get(forecastApi)
        .then(handleForecast)
        .catch(handleError);
        
    }
   
  }, [city]);

  function handleError() {
    alert('hello, enter city');
  }
  return (
    <>
         <div className='container display'>
         <div className='row'>
          <Search
            onSubmit={handleSearch}
                       />
        </div>
        <div  className='row weather'>
          { 
            weatherData && (
              <Weather 
                isMetric={isMetric}
                onToggleIsMetric={handleToggleIsMetric}
                city={weatherData.city}
                time={weatherData.time}
                temperature={weatherData.temperature}
                description={weatherData.description}
                humidity={weatherData.humidity}
                realFeel={weatherData.realFeel}
                wind={weatherData.wind}
                icon={weatherData.icon}
                           
              />
            )
          }
        </div>
    
        <div className='row forecast'>
          <Forecast
            data={forecastData}
            isDaily={forecastDaily}
            isMetric={isMetric} />
        </div>
      </div>
     
    </>
  );
}
