import React from "react";

function Forecast({forecastData}){
    return(
        <div className="w-full mt-6">
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white text-center">
            5-Day Forecast
            </h3>
            <div className="flex overflow-x-auto space-x-20 p-9">
                {forecastData.map((day,index)=>(
                    <div key={index} className="flex-shrink-0 w-32 sm:w-40 bg-gray-100 dark:bg-gray-800 p-4 rounded-lg shadow-md text-center">
                    <p className="text-sm sm:text-base text-gray-900 dark:text-white">{day.date}</p>
                    <img src={day.icon} alt="Weather Icon" className="w-12 sm:w-16 mx-auto my-2"/>
                    <p className="text-base sm:text-lg font-bold txt-gray-900 dark:text-white">{day.temp}°C</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Forecast;