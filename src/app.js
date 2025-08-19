const express = require("express");
const dotenv = require("dotenv");
const weatherRoutes = require("./routes/weatherRoutes");

dotenv.config();
const app = express();
app.use(express.json());

app.use("/weather", weatherRoutes);

app.get("/", (req,res) => {
    res.send("Weather API is running! User /weather/current?city=London")
});

module.exports = app;