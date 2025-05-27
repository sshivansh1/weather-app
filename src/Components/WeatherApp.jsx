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

    const weatherImages = {
        Clear: sunny,
        Clouds: cloudy,
        Rain: rainy,
        Snow: snowy,
        Haze: cloudy,
        Mist: cloudy,
    }

    const weatherImage = data.weather ? weatherImages[data.weather[0].main]: null

    const backgroundImages = {
         Clear: "linear-gradient(to top right, #87CEEB, #FFE57F)",     // Sunny with a warm glow
        Clouds: "linear-gradient(to top right, #B0C4DE, #D6EAF8)",    // Soft, layered clouds
        Rain: "linear-gradient(to bottom, #5F9EA0, #2F4F4F)",         // Moody rainy atmosphere
        Snow: "linear-gradient(to top, #E0F7FA, #FFFFFF)",            // Icy fresh snow
        Haze: "linear-gradient(to bottom, #D3D3D3, #A9A9A9)",         // Dense hazy look
        Mist: "linear-gradient(to bottom, #C0C0C0, #E0E0E0)",         // Foggy and soft
    };

    const backgroundImage = data.weather ? backgroundImages[data.weather[0].main] : 'linear-gradient(to right, #f3b07c, #fcd2a3)';
    return(
        //  The main app container where all our weather UI will live.
        <div className="container" style = {{backgroundImage}}>
            <div className="weather-app" style={{backgroundImage: backgroundImage && backgroundImage.replace ? backgroundImage.replace('to top right', 'to top left'): null}}>
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
                    <img src={weatherImage} alt="weather"/>
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