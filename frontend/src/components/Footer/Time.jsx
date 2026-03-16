import { useEffect, useState } from "react";


const Time = () => {
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

    const date = `${now.getMonth() + 1}/${now.getDate()}/${now.getFullYear()}`;

  return (
    <div className='text-xs text-white text-center mr-2'>
        <p>{time}</p>
        <p>{date}</p>
    </div>
  )
}

export default Time