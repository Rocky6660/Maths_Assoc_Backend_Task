const express = require("express");
const {getCurrentWeather, getWeatherForecast, getBestDay} = require("../controllers/weatherController");

const router = express.Router();

router.get("/current", getCurrentWeather);
router.get("/forecast", getWeatherForecast);

router.get("/bestday", getBestDay);

module.exports = router;