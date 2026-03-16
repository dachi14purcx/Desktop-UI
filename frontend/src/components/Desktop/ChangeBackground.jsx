import { useState, useEffect } from 'react'
import { Link, useOutletContext } from "react-router-dom"
import { addWallpaper, updateCurrentWallpaper } from '../../axios/wallpapersFetch'
import DeleteBackground from './DeleteBackground';

const ChangeBackground = () => {
  const { wallpapers, currentWallpaper, refetchWallpapers } = useOutletContext();
  const [ url, setUrl ] = useState('')
  const [leftClick, setLeftClick] = useState(null)
  const [height, setHeight] = useState(0);

  useEffect(() => {
    setHeight(document.documentElement.scrollHeight - 48);
  }, []);

  const handleChange = async (id) => {
    try {
      await updateCurrentWallpaper(id)
      await refetchWallpapers()
    } catch (e) {
      console.error(e)
    }
  }

  const handleAdd = async (name, str) => {
    try {
      await addWallpaper(name, str)
      await refetchWallpapers()
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <div className={`min-h-screen bg-[radial-gradient(circle_at_center,#1A1F35_0%,#1E2025_100%)] #1A1F35 pb-17 absolute top-0 w-full flex flex-col items-center p-6 gap-15`} onClick={() => setLeftClick(null)}>
      <Link to={'/'} className='absolute top-0 right-0 text-2xl text-[#dadada] hover:bg-[#892d2d] w-10 h-10 text-center'>x</Link>
      
      <h1 className='self-start text-white font-semibold text-3xl ml-9'>Background Settings</h1>
      
      <div className='flex gap-10 items-center'>
        <img src={currentWallpaper} alt="" className='w-125 h-[281.25px] object-cover outline-9 rounded-md drop-shadow-xl'/>

        <div>
          <button className='bg-[#2A2F45] h-13 w-20 rounded-l-3xl text-white shadow-xl font-semibold cursor-pointer' onClick={() => handleAdd(`wallpaper-${Date.now()}`, url)}>Browse</button>
          <input type="text" name="urlInput" alt='Url is demaged' value={url} onChange={e => setUrl(e.target.value)} className='w-90 h-13 rounded-right-md border border-[#2A2F45] shadow-xl bg-[#1E2025] px-3 py-2 text-gray-200 placeholder-gray-500
         focus:outline-none focus:ring-2 focus:ring-[#3B4261] focus:border-[#3B4261]'/>
        </div>
      </div>

      <div>
        <h2 className='text-white text-3xl font-semibold mb-10'>Your wallpaers</h2>

        <div className='flex items-center flex-wrap gap-10 w-[91.5vw]'>
          {wallpapers.slice(1).map(e => (
            <img src={e.url} key={e.id} className='w-90 h-[202.5px] object-cover outline-9 rounded-md drop-shadow-xl cursor-pointer' onClick={() => handleChange(e.id)} onContextMenu={(ev) => {ev.preventDefault(); setLeftClick({ top: ev.pageY, left: ev.pageX, id: e.id })}}/>
          ))}
        </div>
      </div>

      { leftClick && <DeleteBackground coordinates={leftClick} setCoordinates={ setLeftClick } refetchWallpapers={refetchWallpapers} /> }
    </div>
  )
}

export default ChangeBackground