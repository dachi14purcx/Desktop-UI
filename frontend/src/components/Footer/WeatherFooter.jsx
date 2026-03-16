import { useState, useEffect } from 'react'
import clear from "../../assets/clear.png";
import clearNight from "../../assets/clear-night.png";
import cloudy from "../../assets/cloudy.png";
import partlyCloudy from "../../assets/partially-clouded.png";
import partlyCloudyNight from "../../assets/partially-clouded-night.png";
import raining from "../../assets/raining.png";
import snowing from "../../assets/snowing.png";
import { Link } from 'react-router-dom';

const WeatherFooter = () => {
    const [weather, setWeather] = useState('Loading...')
    
    useEffect(() => {
        fetch("https://api.open-meteo.com/v1/forecast?latitude=42.2679&longitude=42.6946&daily=sunrise,sunset,uv_index_max,apparent_temperature_max,apparent_temperature_min,rain_sum,showers_sum,snowfall_sum,precipitation_sum,precipitation_probability_max,wind_speed_10m_max,wind_direction_10m_dominant&hourly=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,rain,showers,snowfall,snow_depth,wind_speed_10m,wind_speed_80m,wind_speed_120m,wind_speed_180m,wind_direction_10m,wind_direction_80m,wind_direction_120m,wind_direction_180m&current=temperature_2m,rain,precipitation,showers,snowfall,is_day,apparent_temperature,relative_humidity_2m,cloud_cover,wind_speed_10m,wind_direction_10m&timezone=auto&past_days=1&forecast_days=16")
        
        .then(res => {
            setWeather('Loading...')
    
            if(!res.ok){
              throw new Error("could not fetch resource")
            }
    
            return res.json()
        })

        .then(data => {
            setWeather(data)
        })

        .catch(err => console.error(err))
    }, [])
    
    const current = weather != "Loading..." ? weather.current : null;
    
    const temp = current ? Math.round(current.temperature_2m) : null;
    const feelsLike = current ? Math.round(current.apparent_temperature) : null;
    const humidity = current ? current.relative_humidity_2m : null;
    const wind = current ? current.wind_speed_10m : null;

    const clouds = current ? current.cloud_cover : 0;
    const rain = current ? current.rain : 0;
    const snow = current ? current.snowfall : 0;
    const isDay = current ? current.is_day === 1 : true;
    
    
    function getPhoto() {
      if (snow > 0) return snowing;
      if (rain > 0) return raining;
      if (clouds > 50) return cloudy;
      if (clouds > 20 && isDay) return partlyCloudy;
      if (clouds > 20 && !isDay) return partlyCloudyNight;
      if (!isDay) return clearNight ;
      return clear;
    }

    function getDescription() {
      if (snow > 0) return 'Snowing';
      if (rain > 0) return 'Raining';
      if (clouds > 50) return 'Cloudy';
      if (clouds > 20) return 'Partialy cloudy';
      return 'Sunny';
    }

  return (
    <>
    { weather === 'Loading...' ? <p className='text-sm text-white'>Loading...</p> :
        <Link className='flex items-center text-xs text-white gap-1' to={'/weather'}>
            <img src={getPhoto()} alt="" className='w-9'/>
            
            <div>
                <p>{temp}℃</p>
                <p>{getDescription()}</p>
            </div>
        </Link>
    }
    </>
  )
}

export default WeatherFooter