import { Link, Outlet, useNavigate } from 'react-router-dom';
import Footer from './components/Footer/Footer';
import LeftClick from './components/Desktop/LeftClick';
import { useEffect, useState} from 'react';
import { getWallpapers } from './axios/wallpapersFetch';
import { getFiles } from './axios/filesFetch';
import camera from "./assets/Icon.png";
import file from "./assets/Files.png"
import DeleteFile from './components/Files/DeleteFile';

function App() {
  const navigate = useNavigate()

  const [leftClick, setLeftClick] = useState(null)
  const [wallpapers, setWallpapers] = useState([])
  const [currentWallpaper, setCurrentWallpaper] = useState("https://1746leblogphoto-1278.kxcdn.com/wp-content/uploads/2022/04/35866957925_4d2979d859_o.jpg")
  const [files, setFiles] = useState([])
  const [language, setLanguage] = useState('')
  const [currentFile, setCurrentFile] = useState()
  const [filesCoordinate, setFilesCoordinate] = useState(null)

  const refetchWallpapers = async () => {
    try {
      const response = await getWallpapers()
      setWallpapers(response.data)
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    refetchWallpapers()
  }, [])

  const refetchFiles = async () => {
    try {
      const response = await getFiles()
      setFiles(response.data)
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    refetchFiles()
  }, [])

  useEffect (() => {
    const current = wallpapers.find(wallpaper => wallpaper.is_current)

    if (current) {
      setCurrentWallpaper(current.url)
    }
  }, [wallpapers])

  const onFileClick = (lang, id) => {
    navigate(`/vscode/${id}?lang=${lang}`)
  }

  return (
    <>
      <div>
        <img src={currentWallpaper} alt="" className='absolute -z-1 w-screen h-screen object-cover' onContextMenu={(e) => {e.preventDefault(); setLeftClick({top: e.pageY, left: e.pageX})}} onClick={() => setLeftClick(null)} draggable='false'/>

        { leftClick && <LeftClick coordinates={leftClick} setCoordinates={ setLeftClick } refetchFiles={refetchFiles} /> }
      </div>

      <div className='flex flex-col flex-wrap justify-end max-h-[calc(100vh-55px)] absolute bottom-13 m-3 gap-5'>
        <Link to={'/camera'} className='flex flex-col items-center gap-1 cursor-pointer'>
          <img src={camera} alt="" className='w-11'/>
          <p className='text-white text-sm'>Camera</p>
        </Link>

        {files.map(e =>(
          <div key={e.id} className='flex flex-col items-center gap-1 cursor-pointer' onClick={() => onFileClick(e.type, e.id)} onContextMenu={(ev) => {ev.preventDefault(); setFilesCoordinate({ top: ev.pageY, left: ev.pageX, id: e.id })}}>
            <img src={file} alt="" className='w-11'/>
            <p className='text-white text-sm'>{e.name}</p>
          </div>
        ))}
      </div>

      { filesCoordinate && <DeleteFile coordinates={filesCoordinate} setCoordinates={ setFilesCoordinate } refetchFiles={refetchFiles} /> }

      <Outlet context={{ wallpapers, currentWallpaper, refetchWallpapers, language, files, currentFile }} />
      <Footer />
    </>
  )
}

export default App