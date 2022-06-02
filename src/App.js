import React, { useState } from "react";
import axios from "axios";

function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=44d4f32817dbceb57b27d09e8e225fdd`;

  const searchLocation = (e) => {
    if (e.key === "Enter") {
      axios.get(url).then((res) => {
        setData(res.data);
        console.log(res.data);
      });
      setLocation("");
    }
  };

  return (
    <div className="app w-full h-screen text-white content-div font-bold">
      <div className="max-w-[700px] h-screen mx-auto p-4 flex flex-col justify-between">
        <div className="w-full text-center p-4">
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            onKeyPress={searchLocation}
            placeholder="Enter Location"
            className="text-black font-xl p-2 rounded-lg border-0 bg-gray-200"
          />
        </div>
        <div className="w-full mx-auto">
          <div className="location">
            <p>{data.name}</p>
          </div>
          <div className="temp">
            {data.main ? <h1>{data.main.temp.toFixed()} °C</h1> : null}
          </div>
          <div className="inline-block relative float-right -rotate-90">
            {data.weather ? (
              <p className="pl-36">{data.weather[0].main}</p>
            ) : null}
          </div>
        </div>

        {data.name !== undefined && (
          <div className="w-full flex justify-evenly items-center p-4 border-2 border-none rounded-lg bg-gradient-to-r from-gray-900 to-transparent hover:bg-transparent">
            <div className="feels">
              {data.main ? <p>{data.main.feels_like} °C</p> : null}
              <p>Feels Like</p>
            </div>
            <div className="humidity">
              {data.main ? <p>{data.main.humidity.toFixed()} %</p> : null}
              <p>Humidity</p>
            </div>
            <div className="wind">
              {data.wind ? <p>{data.wind.speed.toFixed()} MPH</p> : null}
              <p>Wind Speed</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
