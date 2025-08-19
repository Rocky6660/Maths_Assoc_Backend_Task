const apiClient = require("../utils/apiClient");
const dayjs = require("dayjs");

const fetchCurrentWeather = async (city) => {
  const response = await apiClient.get("/weather", {
    params: {
      q: city,
      appid: process.env.WEATHER_API_KEY,
      units: "metric",
    },
  });

  // Return only required fields
  return {
    city: response.data.name,
    temperature: response.data.main.temp,
    condition: response.data.weather[0].description,
    wind_speed: response.data.wind.speed,
  };
};

const fetchWeatherForecast = async (city) => {
  const response = await apiClient.get("/forecast", {
    params: {
      q: city,
      appid: process.env.WEATHER_API_KEY,
      units: "metric",
    },
  });

  const daily = [];
  const seenDates = new Set();

  for (const entry of response.data.list) {
    const date = dayjs(entry.dt_txt).format("YYYY-MM-DD");
    if (!seenDates.has(date)) {
      seenDates.add(date);
      daily.push({
        city: response.data.city.name,
        temperature: entry.main.temp,
        condition: entry.weather[0].description,
        wind_speed: entry.wind.speed,
        date,
      });
    }
    if (daily.length >= 5) break; // only 4 days
  }

  return daily;
};

const findBestDay = async (city, condition) => {
  const forecast = await fetchWeatherForecast(city);

  for (const day of forecast) {
    if (day.condition.toLowerCase().includes(condition.toLowerCase())) {
      return day; // returns city, temp, condition, wind_speed, date
    }
  }
  return null;
};

module.exports = { fetchCurrentWeather, fetchWeatherForecast, findBestDay };
