import { useState, useEffect } from 'react'
import WeatherPannel from './WeatherPannel';
import Map from './Map';
import DailyWeather from './DailyWeather';
import OverView from './OverView';
import Temperature from './details/Temperature';

const Weather = () => {
    const [weather, setWeather] = useState('Loading...')
        
    useEffect(() => {
        fetch("https://api.open-meteo.com/v1/forecast?latitude=42.2700&longitude=42.6983&daily=uv_index_max,sunrise,sunset,rain_sum,temperature_2m_max,temperature_2m_min,wind_speed_10m_max,showers_sum,snowfall_sum,precipitation_sum,precipitation_probability_max&hourly=temperature_2m,relative_humidity_2m,dew_point_2m,apparent_temperature,precipitation_probability,precipitation,rain,showers,snowfall,snow_depth,pressure_msl,cloud_cover,surface_pressure,visibility,wind_speed_10m,wind_direction_10m&current=is_day,temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,rain,showers,snowfall,cloud_cover,pressure_msl,surface_pressure,wind_speed_10m,wind_direction_10m")
        
        .then(res => {
            setWeather('Loading...')
    
            if(!res.ok){
              throw new Error("could not fetch resource")
            }
            
            return res.json()
        })

        .then(data => {
            console.log(data)
            setWeather(data)
        })

        .catch(err => console.error(err))
    }, [])
    
    const current = weather != "Loading..." ? weather.current : null;
    const hourly = weather != "Loading..." ? weather.hourly : null;
    const daily = weather != "Loading..." ? weather.daily : null;
    const longitude = weather != "Loading..." ? weather.longitude : null;
    const latitude = weather != "Loading..." ? weather.latitude : null;

    // ================================================
    // CURRENT WEATHER DATA
    // ================================================

    // Temperature
    const temp = current ? Math.round(current.temperature_2m) : null;
    const feelsLike = current ? Math.round(current.apparent_temperature) : null;

    // Humidity
    const humidity = current ? current.relative_humidity_2m : null;

    // Wind
    const wind = current ? current.wind_speed_10m : null;
    const windDirection = current ? current.wind_direction_10m : null;

    // Precipitation
    const rain = current ? current.rain : 0;
    const showers = current ? current.showers : 0;
    const snowfall = current ? current.snowfall : 0;
    const precipitation = current ? current.precipitation : 0;

    // Atmosphere
    const clouds = current ? current.cloud_cover : 0;
    const pressure = current ? current.pressure_msl : null;
    const surfacePressure = current ? current.surface_pressure : null;

    // Time
    const isDay = current ? current.is_day === 1 : true;

    // ================================================
    // HOURLY WEATHER DATA
    // ================================================

    // Time
    const hourlyTime = hourly ? hourly.time : [];

    // Temperature
    const hourlyTemp = hourly ? hourly.temperature_2m : [];
    const hourlyApparentTemp = hourly ? hourly.apparent_temperature : [];

    // Humidity & Dew Point
    const hourlyHumidity = hourly ? hourly.relative_humidity_2m : [];
    const hourlyDewPoint = hourly ? hourly.dew_point_2m : [];

    // Precipitation
    const hourlyPrecipitationProb = hourly ? hourly.precipitation_probability : [];
    const hourlyPrecipitation = hourly ? hourly.precipitation : [];
    const hourlyRain = hourly ? hourly.rain : [];
    const hourlyShowers = hourly ? hourly.showers : [];
    const hourlySnowfall = hourly ? hourly.snowfall : [];
    const hourlySnowDepth = hourly ? hourly.snow_depth : [];

    // Atmosphere
    const hourlyPressure = hourly ? hourly.pressure_msl : [];
    const hourlySurfacePressure = hourly ? hourly.surface_pressure : [];
    const hourlyCloudCover = hourly ? hourly.cloud_cover : [];
    const hourlyVisibility = hourly ? hourly.visibility : [];

    // Wind
    const hourlyWindSpeed = hourly ? hourly.wind_speed_10m : [];
    const hourlyWindDirection = hourly ? hourly.wind_direction_10m : [];

    // ================================================
    // DAILY WEATHER DATA
    // ================================================

    // Time
    const dailyTime = daily ? daily.time : [];

    // Sun
    const dailySunrise = daily ? daily.sunrise : [];
    const dailySunset = daily ? daily.sunset : [];

    // Temperature
    const dailyTempMax = daily ? daily.temperature_2m_max : [];
    const dailyTempMin = daily ? daily.temperature_2m_min : [];

    // UV Index
    const dailyUvIndexMax = daily ? daily.uv_index_max : [];

    // Precipitation
    const dailyRainSum = daily ? daily.rain_sum : [];
    const dailyShowersSum = daily ? daily.showers_sum : [];
    const dailySnowfallSum = daily ? daily.snowfall_sum : [];
    const dailyPrecipitationSum = daily ? daily.precipitation_sum : [];
    const dailyPrecipitationProbMax = daily ? daily.precipitation_probability_max : [];

    // Wind
    const dailyWindSpeedMax = daily ? daily.wind_speed_10m_max : [];

    const apparentWeather = {temp, dailyTempMax, dailyTempMin, wind, humidity, hourlyVisibility, precipitation, pressure, snowfall, rain, clouds, isDay}
    const dailyWeather = {dailyTime, dailyTempMax, dailyTempMin, dailyRainSum, dailyShowersSum, dailyPrecipitationSum, dailySnowfallSum, dailyPrecipitationProbMax}
  return (
    <div className='min-h-screen max-w-[99.1vw] w-screen text-white absolute bg-linear-to-b to-30% from-[#1F487E] to-[#131F3B] p-10  items-center flex flex-col pb-20'>
        <div className='mt-10 flex justify-around w-full'>
            <WeatherPannel props={apparentWeather}/>
            <Map longitude={longitude} latitude={latitude} />    
        </div>
        <DailyWeather props={dailyWeather} />
        <OverView />

        <div className='flex mt-10 gap-7'>
            <Temperature props={{dailyTempMax: dailyTempMax[0], dailyTempMin: dailyTempMin[0], temp}}/>
            <Temperature props={{dailyTempMax: dailyTempMax[0], dailyTempMin: dailyTempMin[0], temp}}/>
            <Temperature props={{dailyTempMax: dailyTempMax[0], dailyTempMin: dailyTempMin[0], temp}}/>
            <Temperature props={{dailyTempMax: dailyTempMax[0], dailyTempMin: dailyTempMin[0], temp}}/>
        </div>
    </div>
  )
}

export default Weather