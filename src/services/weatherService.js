const apiClient = require("../utils/apiClient");
const dayjs = require("dayjs");

const fetchCurrentWeather = async (city) => {
  const response = await apiClient.get("/weather", {
    params: {
      q: city,
      appid: process.env.WEATHER_API_KEY,
      units: "metric"
    },
  });
  return response.data;
};

const fetchWeatherForecast = async (city) => {
  const response = await apiClient.get("/forecast", {
    params: {
      q: city,
      appid: process.env.WEATHER_API_KEY,
      units: "metric",
    },
  });
  return response.data;
};

const findBestDay = async (city, condition) => {
  const response = await fetchWeatherForecast(city);

  // forecast list = 3-hour intervals (40 items = 5 days)
  for (const entry of response.list) {
    const weatherCondition = entry.weather[0].description.toLowerCase();
    if (weatherCondition.includes(condition.toLowerCase())) {
      return {
        city: response.city.name,
        temperature: entry.main.temp,
        condition: entry.weather[0].description,
        wind_speed: entry.wind.speed,
        date: dayjs(entry.dt_txt).format("YYYY-MM-DD HH:mm"),
      };
    }
  }
  return null;
};

module.exports = { fetchCurrentWeather, fetchWeatherForecast, findBestDay };
