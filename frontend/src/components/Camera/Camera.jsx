import { useRef, useState } from 'react';
import { addPhoto } from '../../axios/photosFetch';
import { Link } from 'react-router-dom';
import { CiCamera } from "react-icons/ci";

const Camera = () => {
    const videoRef = useRef(null)
    const canvasRef = useRef(null)

    const [photo, setPhoto] = useState(null)

    const startCamera = async () => {
        try {
            const mediaStream = await navigator.mediaDevices.getUserMedia({
                video: { facingMode: "user" },
                audio: false
            })

            videoRef.current.srcObject = mediaStream
        } catch (err) {
            console.error("Camera error:", err)
            alert("Camera permission denied or not available")
        }
    }

    const takePhoto = () => {
        if (!videoRef.current) {
            alert("Start the camera first")
            return
        }

        const video = videoRef.current
        const canvas = canvasRef.current
        const ctx = canvas.getContext("2d")

        canvas.width = video.videoWidth
        canvas.height = video.videoHeight

        ctx.drawImage(video, 0, 0, canvas.width, canvas.height)
        canvas.toBlob(async (blob) => {
            if (!blob) return

            const file = new File([blob], "snapshot.png", { type: "image/png" })
            setPhoto(URL.createObjectURL(file))


            try {
                const res = await addPhoto(file)
                console.log("Uploaded:", res)
            } catch (e) {
                console.error("Upload failed:", e)
            }
        }, "image/png")
    }

  return (
    <div className='w-screen h-screen absolute top-0 left-0 bg-[#202020] flex items-center p-5 gap-5'>
        <Link to={'/'} className='absolute top-0 right-0 text-2xl text-[#dadada] hover:bg-[#892d2d] w-10 h-10 text-center'>x</Link>
        <video ref={videoRef} autoPlay playsInline className='w-[90vw] h-[90vh] mb-12 bg-black object-cover scale-x-[-1] rounded-xl'/>

        <div className='flex flex-col h-[90vh] mb-12 justify-center gap-10 ml-7'>
            <button className="px-4 py-2 bg-green-600 text-white rounded" onClick={startCamera} >Start</button>
            <button className="h-15 w-15 flex justify-center items-center bg-white text-black text-4xl rounded-[100px]" onClick={takePhoto}><CiCamera/></button>
        </div>
        
        <canvas ref={canvasRef} className='hidden'/>

        <Link to={'/gallery'}><img src={photo} alt="snapshot" className="w-20 h-20 bg-black absolute bottom-17 right-8 rounded-xl object-cover" /></Link>
    </div>
  )
}

export default Camera