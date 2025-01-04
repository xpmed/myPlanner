import React, { useState } from 'react';
import { Oval } from 'react-loader-spinner';
import axios from 'axios';

const Forecast = () => {
  const [input, setInput] = useState('');
  const [weather, setWeather] = useState({
    loading: false,
    data: {},
    error: false,
  });

  const toDateFunction = (timestamp) => {
    const months = [
      "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
    ];
    const WeekDays = [
      "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
    ];
  
    const date = new Date(timestamp * 1000);
    const dayName = WeekDays[date.getDay()];
    const dayNumber = date.getDate();
    const month = months[date.getMonth()];
    return `${dayName} ${dayNumber} ${month}`;
  };

  const search = async (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      setWeather({ ...weather, loading: true });
      const url = 'https://api.openweathermap.org/data/2.5/forecast';
      const api_key = 'f00c38e0279b7bc85480c3fe775d518c';

      await axios
        .get(url, {
          params: {
            q: input,
            units: 'metric',
            appid: api_key,
          },
        })
        .then((res) => {
          setWeather({ data: res.data, loading: false, error: false });
        })
        .catch((error) => {
          setWeather({ ...weather, data: {}, error: true });
          setInput('');
          console.log('error', error);
        });
    }
  };

  const groupForecastByDay = (forecastData) => {
    const groupedByDay = [];
    let currentDate = null;

    forecastData.forEach((item) => {
      const forecastDate = new Date(item.dt * 1000);
      const dateString = `${forecastDate.getFullYear()}-${forecastDate.getMonth() + 1}-${forecastDate.getDate()}`;
      
      if (currentDate !== dateString) {
        groupedByDay.push(item);
        currentDate = dateString;
      }
    });

    return groupedByDay;
  };

  return (
    <div className="weather-div">
      <div className="search-bar">
        <input
          type="text"
          className="city-search"
          placeholder="Wprowadź nazwę miasta.."
          name="query"
          value={input}
          onChange={(event) => setInput(event.target.value)}
          onKeyPress={search}
        />
      </div>

      {weather.loading && (
        <>
          <br />
          <br />
          <Oval type="Oval" color="black" height={100} width={100} />
        </>
      )}

      {weather.error && (
        <>
          <br />
          <br />
          <span className="error-message">
            <span style={{ fontSize: '20px' }}>City not found</span>
          </span>
        </>
      )}

      {weather && weather.data && weather.data.city && (
        <div>
          <div className="city-name">
            <h2 className="city-header">
              {weather.data.city.name}, <span>{weather.data.city.country}</span>
            </h2>
          </div>

          <div className="forecast">
            <div className="forecast-container">
              {groupForecastByDay(weather.data.list).slice(0, 4).map((forecast, index) => (
                <div key={index} className="forecast-day">
                  <div className="date">
                    <span>{toDateFunction(forecast.dt)}</span>
                  </div>
                  <div className="icon-temp">
                    <img
                      src={`https://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png`}
                      alt={forecast.weather[0].description}
                    />
                    {Math.round(forecast.main.temp)}
                    <sup className="deg">°C</sup>
                  </div>
                  <div className="des-wind">
                    <p>{forecast.weather[0].description.toUpperCase()}</p>
                    <p>Wind Speed: {forecast.wind.speed} m/s</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Forecast;
