import { useState,useEffect } from "react";
import axios from "axios";
import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";
import Forecast from "./components/Forecast";
// import { document } from "postcss";

const API_KEY="43375e5dc4fd7eca36ba1dc852abe88c";
const WEATHER_URL="https://api.openweathermap.org/data/2.5/weather";
const FORECAST_URL="https://api.openweathermap.org/data/2.5/forecast";

function App(){
    const [weather,setWeather]=useState(null);
    const [forecast,setForecast]=useState([]);
    const [loading,setLoading]=useState(false);
    const [error,setError]=useState("");
    const [searchHistory,setSearchHistory]=useState([]);

    const [theme,setTheme]=useState(()=>{
        if(typeof window!=="undefined"){
            return localStorage.getItem("theme") || (window.matchMedia("(prefers-color-schema:dark)").matches ? "dark":"light");

        }
        return "light";
    });

    useEffect(()=>{
        if(theme==="dark"){
            document.documentElement.classList.add("dark");
        }
        else{
            document.documentElement.classList.remove("dark");
        }
        localStorage.setItem("theme",theme);
    },[theme]);

    const toggleTheme = ()=>{
        setTheme((prevTheme)=>(prevTheme==="light"?"dark":"light"))
    };

    const fetchWeather= async (city)=>{
        setLoading(true);
        try{
            const [weatherRes,forecastRes] = await Promise.all([
                axios.get(WEATHER_URL,{
                    params:{q:city,appid:API_KEY,units:"metric"},
                }),
                axios.get(FORECAST_URL,{
                    params:{q:city,appid:API_KEY,units:"metric"},
                }),
            ]);

            setWeather(weatherRes.data);
            setError("");

            const forecastData = forecastRes.data.list
                .filter((_,index)=>index%8==0)
                .map((item)=>({
                    date: new Date(item.dt_txt).toLocaleDateString("en-US",{
                        weekday:"short",
                    }),
                    temp:Math.round(item.main.temp),
                    icon:`https://openweathermap.org/img/wn/${item.weather[0].icon}.png`,
                }));

            setForecast(forecastData);

            setSearchHistory((prevHistory)=>{
                const updatedHistory=[city,...prevHistory.filter((c)=> c!==city)];
                return updatedHistory.slice(0,5);
            });
        }
        catch(err){
            setError("City not found. Please try again.");
            setWeather(null);
            setForecast([]);
        }
        setLoading(false);
    };

    return(

        <div className="min-h-screen flex flex-col items-center justify-center dark:bg-gray-900 text-gray-900 dark:text-white p-5" >
            <div className="text-lg text-black-900 font-bold">
                <h1>
                    Weather App
                </h1>
            </div>

            <SearchBar fetchWeather={fetchWeather}/>
            {loading && <p className="text-blue-500 mt-2 animate-pulse">Fetching Weather...</p>}
            {error && <p className="text-red-500 mt-2">{error}</p>}
            {weather && <WeatherCard weather={weather}/>}
            {forecast.length > 0 && <Forecast forecastData={forecast}/>}

            {searchHistory.length > 0 && (
                <div className="mt-6">
                    <h3 className="text-lg font-bold">Search History</h3>
                    <div className="flex flex-wrap justify-center gap-2 mt-2">
                        {searchHistory.map((city,index)=>(
                            <button
                            key={index}
                            onClick={()=>fetchWeather(city)}
                            className="px-3 py-1 bg-gray-300 dark:bg-gray-700 rounded-md"
                            >
                                {city}
                            </button>
                        ))}
                    </div>
                    </div>
            )}
        </div>
    );
}

export default App;