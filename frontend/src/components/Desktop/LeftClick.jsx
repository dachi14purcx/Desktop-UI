import { GrRefresh } from "react-icons/gr";
import { TbDeviceDesktopCog } from "react-icons/tb";
import { IoMdAddCircleOutline } from "react-icons/io";
import { Link } from "react-router-dom";
import { useState } from "react";
import { addFile } from "../../axios/filesFetch";

const LeftClick = ({coordinates, setCoordinates, refetchFiles}) => {
  const [ adding, setAdding ] = useState(false)
  const [name, setName] = useState('')
  
  const add = function(name){
    const index = name.indexOf(".")
    const type = name.slice(index + 1)

    addFile(name, type)
    refetchFiles()
    setAdding(prev => !prev)
  }

  return (
    <div className='absolute menue w-60 text-white p-2 py-2.5 text-[14px] flex flex-col' style={{ top: coordinates.top + 10 , left: coordinates.left + 10 }}>
        <Link to={'/changebackground'} className="flex items-center gap-1 hover:bg-gray-100/8 p-1.5 px-2 rounded-md" onClick={() => setCoordinates(null)}><TbDeviceDesktopCog size={17}/> Change wallpaper</Link>
        <div className="flex items-center gap-2 hover:bg-gray-100/8 p-1.5 px-2 rounded-md duration-200" onClick={() => window.location.reload()}><GrRefresh size={17}/> Refresh</div>
        <div className="cursor-pointer flex items-center gap-2 hover:bg-gray-100/8 p-1.5 px-2 rounded-md duration-200" onClick={() => setAdding(true)} onKeyDown={(e) => {(adding && e.key === 'Enter') && add(name)}}><IoMdAddCircleOutline size={17}/> New File { adding && <input type="text" value={name} onChange={e => setName(e.target.value)}/>}</div>
    </div>
  )
}

export default LeftClick