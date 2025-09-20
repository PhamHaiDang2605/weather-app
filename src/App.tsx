import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { getWeatherData } from './services/api';
import WeatherDisplay from './components/WeatherDisplay';
import Header from './components/Header';
import { WeatherData } from './types/weather';
import './App.css';

const App: React.FC = () => {
  const [city, setCity] = useState<string>('Hanoi');
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Tải dữ liệu mặc định cho Hà Nội khi vào trang dự báo
  useEffect(() => {
    const fetchDefaultWeather = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getWeatherData('Hanoi');
        setWeather(data);
      } catch (error) {
        setError('Không tải được dữ liệu mặc định');
      } finally {
        setLoading(false);
      }
    };
    fetchDefaultWeather();
  }, []); // Chỉ chạy 1 lần khi load

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const data = await getWeatherData(city);
      setWeather(data);
    } catch (error) {
      setError('Không tìm thấy thành phố hoặc lỗi mạng');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route
            path="/search"
            element={
              <div>
                <form onSubmit={handleSubmit}>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Nhập tên thành phố (ví dụ: Hanoi)"
                  />
                  <button type="submit">Tìm thời tiết</button>
                </form>
                {error && <p className="error">{error}</p>}
                {loading ? (
                  <p>Đang tải...</p>
                ) : (
                  <WeatherDisplay
                    current={weather?.current_weather}
                    forecast={weather?.daily}
                    mode="current"
                  />
                )}
              </div>
            }
          />
          <Route
            path="/"
            element={
              loading ? (
                <p>Đang tải...</p>
              ) : (
                <WeatherDisplay
                  current={weather?.current_weather}
                  forecast={weather?.daily}
                  mode="forecast"
                />
              )
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;