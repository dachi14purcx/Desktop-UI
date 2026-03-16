import React from 'react'
import { useEffect, useState } from 'react';
import clear from '../../assets/clear.png'
import clearNight from "../../assets/clear-night.png";
import cloudy from "../../assets/cloudy.png";
import partlyCloudy from "../../assets/partially-clouded.png";
import partlyCloudyNight from "../../assets/partially-clouded-night.png";
import raining from "../../assets/raining.png";
import snowing from "../../assets/snowing.png";

const WeatherPannel = ({props}) => {
    const {temp, dailyTempMax, dailyTempMin, wind, humidity, hourlyVisibility, precipitation, pressure, snowfall, rain, clouds, isDay} = props;

    const [now, setNow] = useState(new Date())

    useEffect(() => {
        const interval = setInterval(() => setNow(new Date()), 1000)

        return () => clearInterval(interval);
    }, [])
    

    const time = now.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
    });

    function getPhoto() {
        if (snowfall > 0) return snowing;
        if (rain > 0) return raining;
        if (clouds > 50) return cloudy;
        if (clouds > 20 && isDay) return partlyCloudy;
        if (clouds > 20 && !isDay) return partlyCloudyNight;
        if (!isDay) return clearNight ;
        return clear;
    }

    function getDescription() {
        if (snowfall > 0) return 'Snowing';
        if (rain > 0) return 'Raining';
        if (clouds > 50) return 'Cloudy';
        if (clouds > 20) return 'Mostly cloudy';
        return 'Sunny';
    }
    
  return (
    <div className='bg-white/6 h-67.5 w-155 rounded-md flex flex-col p-4 gap-3'>
        <div>
            <p className='text-[15px] font-medium'>Current weather</p>
            <p className='text-[12px] opacity-85'>{time}</p>
        </div>

        <div className='flex items-center'>
            <img src={getPhoto()} alt="" className='w-27 -ml-4 -mb-7'/>
            <h2 className='text-[65px] flex gap-2'>{temp} <span className='text-[35px] mt-3'>℃</span></h2>
            <div className='ml-10 flex flex-col gap-2'>
                <p className='font-medium text-xl'>{getDescription()}</p>
                <p className='text-sm opacity-85'>Cloud cover <span className='ml-3'>{clouds}%</span></p>
            </div>
        </div>

        <p className='font-medium -mt-2 mb-1'>Expected high of {Math.floor(dailyTempMax[0])}℃ with a low of {Math.floor(dailyTempMin[0])}℃</p>

        <div className='flex w-full justify-between text-[16px]'>
            <div>
                <p className='text-[14px] opacity-85'>Wind</p>
                <p >{Math.floor(wind)} km/h</p>
            </div>

            <div>
                <p className='text-[14px] opacity-85'>Humidity</p>
                <p>{humidity}%</p>
            </div>

            <div>
                <p className='text-[14px] opacity-85'>Visibility</p>
                <p>{Math.floor(hourlyVisibility[0] / 1000)} km</p>
            </div>

            <div>
                <p className='text-[14px] opacity-85'>Pressure</p>
                <p>{Math.floor(pressure)} mb</p>
            </div>

            <div>
                <p className='text-[14px] opacity-85'>Precipitation</p>
                <p>{precipitation} mm</p>
            </div>
        </div>
    </div>
  )
}

export default WeatherPannel