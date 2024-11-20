import React from 'react';

const WeatherCard = ({ day }) => {
  const { dt_txt, main, weather } = day;

  return (
    <div style={{ border: '1px solid #ccc', padding: '10px', margin: '10px' }}>
      <h3>{new Date(dt_txt).toLocaleDateString()}</h3>
      <p>Temperatura: {main.temp}°C</p>
      <p>Estado: {weather[0].description}</p>
      <img
        src={`https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`}
        alt={weather[0].description}
      />
    </div>
  );
};

export default WeatherCard;
