import React, { useState } from 'react';
import { getWeatherData } from './services/api';
import WeatherDisplay from './components/WeatherDisplay';
import { WeatherData } from './types/weather';
import './App.css';

const App: React.FC = () => {
  const [city, setCity] = useState<string>('Hanoi'); // State lưu tên thành phố
  const [weather, setWeather] = useState<WeatherData | null>(null); // State lưu dữ liệu thời tiết
  const [loading, setLoading] = useState<boolean>(false); // State loading
  const [error, setError] = useState<string | null>(null); // State lưu lỗi

  // Hàm xử lý submit form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Ngăn reload trang
    setLoading(true); // Bắt đầu loading
    setError(null); // Xóa lỗi cũ
    try {
      const data = await getWeatherData(city); // Gọi API với city hiện tại
      setWeather(data); // Cập nhật dữ liệu
    } catch (error) {
      setError('Không tìm thấy thành phố hoặc lỗi mạng'); // Lưu lỗi
    } finally {
      setLoading(false); // Kết thúc loading
    }
  };

  return (
    <div className="App">
      <h1>Weather App</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)} // Cập nhật city khi gõ
          placeholder="Nhập tên thành phố (ví dụ: Hanoi)"
        />
        <button type="submit">Tìm thời tiết</button>
      </form>
      {error && <p className="error">{error}</p>} {/* Hiển thị lỗi nếu có */}
      {loading ? (
        <p>Đang tải...</p>
      ) : (
        <WeatherDisplay current={weather?.current_weather} forecast={weather?.daily} />
      )}
    </div>
  );
};

export default App;