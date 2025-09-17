// Định nghĩa interface (kiểu dữ liệu) cho TS, giúp code an toàn
export interface CurrentWeather {
  temperature: number;  // Nhiệt độ hiện tại (số)
  windspeed: number;    // Tốc độ gió
  precipitation_probability: number;  // Xác suất mưa (%)
}

export interface DailyForecast {
  time: string[];       // Mảng ngày (chuỗi)
  temperature_2m_max: number[];  // Mảng nhiệt độ max
  temperature_2m_min: number[];  // Mảng nhiệt độ min
}

export interface WeatherData {
  current_weather: CurrentWeather;  // Thời tiết hiện tại
  daily: DailyForecast;             // Dự báo hàng ngày
}