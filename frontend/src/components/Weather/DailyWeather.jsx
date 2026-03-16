import React from 'react'
import clear from '../../assets/clear.png'
import raining from "../../assets/raining.png";
import snowing from "../../assets/snowing.png";

const DailyWeather = ({props}) => {
    const {dailyTime, dailyTempMax, dailyTempMin, dailyRainSum, dailySnowfallSum} = props

    if (!dailyTempMax) return null

    function getPhoto(id) {
        if (dailySnowfallSum[id] > 0) return snowing;
        if (dailyRainSum[id] > 0) return raining;
        return clear;
    }

    function getNext7Days() {
        const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        
        const today = new Date().getDay();
        const result = [];

        for (let i = 0; i < 7; i++) {
            result.push(days[(today + i) % 7]);
        }

        return result;
    }

    const days = getNext7Days();

  return (
    <div className='flex mt-20 gap-5'>
        {dailyTime.map((e, index) => (
            <div key={index} className={`${index ? 'bg-[#202B47]' : 'bg-[#2C3751] backdrop-blur-3xl'} rounded-xl p-3 flex flex-col gap-3 justify-center`}>
                <div className={`flex justify-between text-[15px] ${index ? 'text-[#A2ABB7]' : 'text-white'} items-center`}>
                    <p className='font-medium text-[18px]'>{e.slice(8)}</p>
                    <p>{days[index]}</p>
                </div>
                <div className='flex gap-6 items-center mx-5 text-[18px] font-medium'>
                    <img src={getPhoto(index)} alt="" className='w-20'/>
                    <div>
                        <p>{Math.floor(dailyTempMax[index])}°</p>
                        <p>{Math.floor(dailyTempMin[index])}°</p>
                    </div>
                </div>
            </div>
        ))}
    </div>
  )
}

export default DailyWeather