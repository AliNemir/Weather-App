import "./App.css";
import React, { useState, useEffect } from "react";
import Header from "./componants/Header";
import Weather from "./componants/Weather";
import Forecast from "./componants/Forecast";
import axios from "axios";

const URL = "https://api.openweathermap.org/data/2.5/onecall";
const API_KEY = "c7c7e26782a97906905097118d594178";

function App() {
  const [lat, setLat] = useState([]);
  const [long, setLong] = useState([]);
  const [city, setCity] = useState("");
  const [temprature, setTemprature] = useState([]);
  const [humidity, setHumidity] = useState([]);
  const [sunrise, setSunrise] = useState([]);
  const [sunset, setSunset] = useState([]);
  const [icon, setIcon] = useState([]);
  const [forcast, setForcast] = useState([]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (position) {
      setLat(position.coords.latitude);
      setLong(position.coords.longitude);
    });

    axios
      .get(
        `${URL}?lat=${lat}&lon=${long}&exclude=hourly,minutely&appid=${API_KEY}`
      )
      .then((weatherData) => {
        console.log(weatherData.data);
        setTemprature(weatherData.data.current.temp);
        setSunrise(weatherData.data.current.sunrise);
        setSunset(weatherData.data.current.sunset);
        setHumidity(weatherData.data.current.humidity);
        setCity(weatherData.data.timezone);
        setIcon(weatherData.data.current.weather[0].main);
        setForcast(weatherData.data.daily)
      });
  }, [lat, long]);
  return (
    <div className="main">
      
      <Header />
      <Weather
        temprature={temprature}
        humidity={humidity}
        sunrise={sunrise}
        sunset={sunset}
        city={city}
        icon={icon}
      />
      <Forecast forcast={forcast}/>
    </div>
  );
}

export default App;
