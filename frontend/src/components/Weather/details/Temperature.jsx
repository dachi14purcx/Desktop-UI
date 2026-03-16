import React from 'react'

const Temperature = ({props}) => {
    const {dailyTempMax, dailyTempMin, temp} = props
    const percentage = ((Number(temp) - Number(dailyTempMin)) / (Number(dailyTempMax) - Number(dailyTempMin))) * 100;

  return (
    <div className='bg-[#2C3751] w-86 h-62.5 rounded-xl p-4'>
      <p className='text-[15px]'>Temperature</p>

      <div className='h-3 w-full rounded-full bg-[#3B455D] mt-10'>
        <div
          className='h-full bg-[#18BFCA] rounded-full'
          style={{ width: `${percentage}%` }}
        ></div>
      </div>

    </div>
  )
}

export default Temperature