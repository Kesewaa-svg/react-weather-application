import React, { useState } from "react";
import axios from "axios";
import "./Weather.css";

export default function Weather() {
  let [city, setCity] = useState(null);
  let [tempertaure, setTemperature] = useState(null);
  let [loaded, setLoaded] = useState(false);

  function showTemperature(response) {
    setLoaded(true);
    setTemperature({
      temperature: response.data.main.temp,
      wind: response.data.wind.speed,
      humidity: response.data.main.humidity,
    });
  }
  function handleSubmit(event) {
    event.preventDefault();
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=1a2b7258ebd456c01aef9175dfe8b709&units=metric`;

    axios.get(apiUrl).then(showTemperature);
  }

  function showCity(event) {
    setCity(event.target.value);
  }

  let form = (
    <form onSubmit={handleSubmit}>
      <input type="search" placeholder="Type a city.." onChange={showCity} />
      <button type="Submit">Search</button>
    </form>
  );

  if (loaded) {
    return (
      <div>
        {form}{" "}
        <ul>
          <li>Temperature: {Math.round(tempertaure.temperature)} °C </li>
          <li>Wind: {tempertaure.wind} km/h</li>
          <li>Humidity: {tempertaure.humidity}%</li>
        </ul>
      </div>
    );
  } else {
    return form;
  }
}
