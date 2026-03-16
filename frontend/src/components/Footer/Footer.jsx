import React from 'react'
import WeatherFooter from './WeatherFooter'
import Time from './Time'

const Footer = () => {
  return (
    <div className='w-full h-12 border border-t-white/20 bg-[#2525259a] backdrop-blur-3xl shadow-lg fixed bottom-0 flex justify-between px-3 items-center'>
        <WeatherFooter />
        <Time />
    </div>
  )
}

export default Footer