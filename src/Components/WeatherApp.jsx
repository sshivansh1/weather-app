import sunny from "../assets/images/sunny.png"
import cloudy from "../assets/images/cloudy.png"
import rainy from "../assets/images/rainy.png"
import snowy from "../assets/images/snowy.png"
import loading from "../assets/images/loading.gif"
import { useState, useEffect } from "react"


const WeatherApp = () => {
    const [data, setData] = useState({})
    const [location, setLocation] = useState('')
    const api_key = 'c4af425271c7865194f73b48922ab80a'
    
    useEffect(()=>{
    const fetchDefaultWeather = async () => {
        const defaultLocation = "Edmonton"
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${defaultLocation}&units=Metric&appid=c4af425271c7865194f73b48922ab80a`
        const res = await fetch(url)
        const defaultData = await res.json()
        setData(defaultData)
    }   
    fetchDefaultWeather()
    }, [])

    const handleInputChange = (e) =>{
        setLocation(e.target.value)
    }

    const search = async () => {
        if(location.trim() !== "")
        {
            // https://api.openweathermap.org/data/2.5/weather?q=London&units=Metric&appid=c4af425271c7865194f73b48922ab80a
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=Metric&appid=${api_key}`
            const response = await fetch(url)
            const searchData = await response.json()
            setData(searchData)
            setLocation('')
            console.log(searchData)
        }
    }

    const handleKeyDown = (e) => {
        if(e.key === "Enter")
            search()
    }

    return(
        //  The main app container where all our weather UI will live.
        <div className="container"> 
            <div className="weather-app">
                <div className="search">
                    <div className="search-top">
                        <i className="fa-solid fa-location-dot"></i>
                        <div className="location">{data.name}</div>
                    </div>
                    <div className="search-bar">
                        <input type="text" placeholder="Enter Location"
                         value={location}
                         onChange={handleInputChange}
                         onKeyDown={handleKeyDown}/>
                        <i className="fa-solid fa-magnifying-glass" onClick={search}></i>
                    </div>
                </div>

                <div className="weather">
                    <img src={sunny} alt="sunny"/>
                    <div className="weather-type">{data.weather ? data.weather[0].main: null}</div>
                    <div className="temp">{data.main ? `${Math.floor(data.main.temp)}°C`: null}</div>
                </div>

                <div className="weather-date">
                    <p>Friday, May 24</p>
                </div>
                <div className="weather-data">
                    <div className="humidity">
                        <div className="data-name">Humidity</div>
                        <i className="fa-solid fa-droplet"></i>
                        <div className="data">{data.main ? `${(data.main.humidity)}%`:null}</div>
                    </div>
                    
                    <div className="wind">
                        <div className="data-name">Wind</div>
                        <i className="fa-solid fa-wind"></i>
                        <div className="data"> {data.wind ? `${(data.wind.speed)} km/h`: null}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default WeatherApp;