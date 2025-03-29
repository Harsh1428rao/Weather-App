import React,{useState} from "react";

function SearchBar({fetchWeather}){
    const [city,setCity]=useState("");

    const handleSearch=(e)=>{
        e.preventDefault();
        if(city.trim()!==""){
            fetchWeather(city);
            setCity("");
        }
    };

    return(
        <form onSubmit={handleSearch} className="w-full max-w-lg flex flex-col sm:flex-row items-center gap-3">
            <input
            type="text"
            placeholder="Enter city..."
            value={city}
            onChange={(e)=> setCity(e.target.value)}
            className="w-full sm:w-3/4 p-3 border rounded-md text-gray-800 dark:text-white bg-white dark:bg-gray-800 outline-none"
            />
            <button
              type="submit"
              className="w-full sm:w-1/4 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md text-sm sm:text-base"
              >
              Search 
              </button>
        </form>
    );
}
export default SearchBar;