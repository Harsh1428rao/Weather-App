import React from "react";


const weatherImages={
    Clear: "https://cdn-icons-png.flaticon.com/512/869/869869.png", 
    Clouds: "https://cdn-icons-png.flaticon.com/512/414/414825.png", 
    Rain: "https://cdn-icons-png.flaticon.com/512/1163/1163657.png", 
    Drizzle: "https://cdn-icons-png.flaticon.com/512/4834/4834554.png", 
    Thunderstorm: "https://cdn-icons-png.flaticon.com/512/1779/1779940.png", 
    Snow: "https://cdn-icons-png.flaticon.com/512/1312/1312169.png", 
    Mist: "https://cdn-icons-png.flaticon.com/512/4005/4005901.png", 
    Haze: "https://cdn-icons-png.flaticon.com/512/1779/1779908.png", 
    Smoke: "https://cdn-icons-png.flaticon.com/512/1197/1197102.png", 
    Dust: "https://cdn-icons-png.flaticon.com/512/869/869869.png", 
    Fog: "https://cdn-icons-png.flaticon.com/512/4005/4005901.png", 
    Sand: "https://cdn-icons-png.flaticon.com/512/869/869869.png", 
    Ash: "https://cdn-icons-png.flaticon.com/512/868/868307.png", 
    Squall: "https://cdn-icons-png.flaticon.com/512/1779/1779908.png", 
    Tornado: "https://cdn-icons-png.flaticon.com/512/1779/1779974.png", 

};

function WeatherCard({weather,fetchWeather}){
    const weatherCondition = weather.weather[0].main;
    const weatherIcon=weatherImages[weatherCondition]|| weatherImages["Clear"];

    return (
        <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg mt-5 w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl text-center">
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">
                {weather.name}
            </h2>
            <p className="text-gray-700 dark:text-gray-300 text-base sm:text-lg">
                {weatherCondition}
            </p>

            <img src={weatherIcon} alt={weatherCondition} className="w-16 sm:w-20 mx-auto my-2"/>

            <div className="mt-3">
                <p className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
                    {Math.round(weather.main.temp)}°C
                </p>
                <p className="text-gray-700 dark:text-gray-300 text-sm sm:text-base">
                    Humidity:{weather.main.humidity}%
                </p>
                <p className="text-gray-700 dark:text-gray-300 text-sm sm:text-base">
                    Wind:{weather.wind.speed} km/h
                </p>
            </div>
            <button
            onClick={()=> fetchWeather(weather.name)}
            className="mt-4 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md text-sm sm:text-base"
            >
                Refresh
            </button>
        </div>
    )
}
export default WeatherCard;