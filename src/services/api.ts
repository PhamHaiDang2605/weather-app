import axios from 'axios';  // Import Axios để gọi API
import { WeatherData } from '../types/weather';  // Import interface

// Hàm chính: Lấy dữ liệu thời tiết dựa trên tên thành phố
export const getWeatherData = async (city: string): Promise<WeatherData> => {
  try {
    // Bước 1: Chuyển tên thành phố thành tọa độ (sử dụng Geocoding API của Open-Meteo, miễn phí)
    const geoResponse = await axios.get(`https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1&language=vi&format=json`);
    const { latitude, longitude } = geoResponse.data.results[0];  // Lấy lat/long từ JSON

    // Bước 2: Gọi Weather API với tọa độ
    const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&precipitation_probability=true&hourly=precipitation_probability&daily=temperature_2m_max,temperature_2m_min&timezone=Asia/Bangkok`;
    const response = await axios.get(weatherUrl);
    
    // Trả về dữ liệu đã định dạng theo interface
    return {
      current_weather: {
        temperature: response.data.current_weather.temperature,
        windspeed: response.data.current_weather.windspeed,
        precipitation_probability: response.data.hourly.precipitation_probability[0] || 0,  // Lấy giờ hiện tại
      },
      daily: {
        time: response.data.daily.time,
        temperature_2m_max: response.data.daily.temperature_2m_max,
        temperature_2m_min: response.data.daily.temperature_2m_min,
      }
    };
  } catch (error) {
    console.error('Lỗi gọi API:', error);  // In lỗi ra console (F12 để xem)
    throw new Error('Không thể lấy dữ liệu thời tiết');  // Ném lỗi để xử lý ở App
  }
};