import React, { useEffect, useRef, useState } from 'react'
import './Weather.css'
import search_icon from '../assets/search.png'
import drizzle_icon from '../assets/drizzle.png'
import humidity_icon from '../assets/humidity.png'
import wind_icon from '../assets/wind.png'

const Weather = () => {

  const [weatherData, setWeatherData] = useState(false)
  const inputRef = useRef()

  const search = async (city)=>{
    if(city === ""){
      alert("Enter City Name")
      return
    }
    try{
      const url =`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;
      const response = await fetch(url);
      const data = await response.json();

      if(!response.ok){
        alert(data.message);
        return;
      }

      console.log(data);
      setWeatherData({
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        temperature: Math.floor(data.main.temp),
        location: data.name
      })
      
      
    }catch(error){
      setWeatherData(false);
      console.error("Error in fetching the data")
    }
  }

  useEffect(()=>{
    search("delhi")
  },[]) 

  return (
    <>
    
    <div className="weather">
      <h1>WEATHER APP</h1>
    <img src={drizzle_icon} alt="" className='weatherImg' />

      <div className="searchBar">
        <input ref={inputRef} type="text" placeholder='search location' />
        <img  src={search_icon} alt="" onClick={()=>search(inputRef.current.value)}/>
      </div>

      {weatherData?<>
      <p className='temperature'> {weatherData.temperature}°c</p>
      <p className='location'>{weatherData.location}</p>
      <div className="weatherData">
        <div className="col">
          <img src={humidity_icon} alt="" />
          <div>
            <p>{weatherData.humidity}%</p>
            <span>Humidity</span>
          </div>
        </div>
        <div className="col">
          <img src={wind_icon} alt="" />
          <div>
            <p>{weatherData.windSpeed}km/h</p>
            <span>Wind Speed</span>
          </div>
        </div>
      </div>

      </>:<></>
      }
   
    </div>

  
    </>
  )
}


export default Weather