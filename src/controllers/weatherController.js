const { fetchCurrentWeather, fetchWeatherForecast, findBestDay } = require("../services/weatherService");

const getCurrentWeather = async(req,res) => {
    try {
        const city = req.query.city;
        if(!city) return res.status(400).json({error : "City is required"});

        const weather = await fetchCurrentWeather(city);
        res.json(weather); 
    }

    catch (error) {
        res.status(500).json({error : "Failed tp fetch  weather data"});
    }
};

const getWeatherForecast = async(req,res) => {
    try{
        const city = req.query.city;
        if(!city) return res.status(400).json({error: "City is required"});

        const forecast = await fetchWeatherForecast(city);
        res.json(forecast);
    } catch(error) {
        res.status(500).json({error : "Failed to fetch forecast"});
    }
};

const getBestDay = async(req,res) => {
    try {
        const {city, condition} = req.query;
        if(!city || !condition) {
            return res.status(400).json({error :"City and ondition are required"});
        }
        const bestday = await findBestDay(city, condition);
        if(!bestday){
            return res.status(404).json({error:"No matching day found."});
        }
        res.json(bestday);
    } catch(error) {
        res.status(500).json({error:"failed to fetch best day"});
    }
};

module.exports = {getCurrentWeather, getWeatherForecast, getBestDay};