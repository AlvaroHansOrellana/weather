import React, { useState, useEffect } from 'react';
import WeatherList from './components/WeatherList';
import './App.css';

const API_KEY = '13ca4facb8666b3116b714e0493128a2'; 

const App = () => {
  const [city, setCity] = useState('Madrid');
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchWeather = async (location) => {
    setLoading(true);
    try {
      const url = location.lat && location.lon
        ? `https://api.openweathermap.org/data/2.5/forecast?lat=${location.lat}&lon=${location.lon}&units=metric&appid=${API_KEY}`
        : `https://api.openweathermap.org/data/2.5/forecast?q=${location}&units=metric&appid=${API_KEY}`;
        
      const response = await fetch(url);
      const data = await response.json();
  
      if (data.list) {
        setForecast(data.list); // Guardar los datos de pronóstico
      } else {
        console.error("No se encontró la ubicación");
      }
    } catch (error) {
      console.error("Error al obtener los datos:", error);
    } finally {
      setLoading(false);
    }
  };
  

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        fetchWeather({ lat: latitude, lon: longitude });
      },
      () => {
        fetchWeather('Madrid'); // Fallback a Madrid si falla la geolocalización
      }
    );
  }, []);
  
  // Manejador del formulario
  const handleSearch = (e) => {
    e.preventDefault();
    fetchWeather(city);
  };

  return (
    <div>
      <h1>Weather Info</h1>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Busca una ciudad"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button type="submit">Buscar</button>
      </form>

      {loading ? (
        <p>Cargando...</p>
      ) : (
        <WeatherList forecast={forecast} />
      )}
    </div>
  );
};

export default App;
