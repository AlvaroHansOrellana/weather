import React from 'react';
import WeatherCard from '../WeatherCard';
import { v4 as uuidv4 } from 'uuid';

const WeatherList = ({ forecast }) => {

  const dailyForecast = forecast.filter((_, index) => index % 8 === 0);

  return (
    <div>
      {dailyForecast.map((day) => (
        <WeatherCard key={uuidv4()} day={day} />
      ))}
    </div>
  );
};

export default WeatherList;
