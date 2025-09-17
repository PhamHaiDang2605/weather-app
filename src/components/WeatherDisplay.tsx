import React from 'react';
import { CurrentWeather, DailyForecast } from '../types/weather';
import './WeatherDisplay.css';

interface Props {
  current: CurrentWeather | null | undefined; // Add undefined
  forecast: DailyForecast | null | undefined; // Add undefined
}

const WeatherDisplay: React.FC<Props> = ({ current, forecast }) => {
  if (!current || !forecast) {
    return <div>Đang tải...</div>;
  }

  return (
    <div className="weather-container">
      <h2>Thời tiết hiện tại</h2>
      <p>Nhiệt độ: {current.temperature}°C</p>
      <p>Tốc độ gió: {current.windspeed} km/h</p>
      <p>Xác suất mưa: {current.precipitation_probability}%</p>
      <h2>Dự báo 7 ngày</h2>
      <ul>
        {forecast.time.map((day, index) => (
          <li key={day}>
            {day}: Max {forecast.temperature_2m_max[index]}°C / Min {forecast.temperature_2m_min[index]}°C
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WeatherDisplay;