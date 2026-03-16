import React, { useEffect, useMemo, useRef, useState } from "react";
import ts from "typescript";
import { useOutletContext, useParams, useSearchParams } from "react-router-dom";
import { updateFile } from "../../axios/filesFetch";
import { Link } from "react-router-dom";

const VsCode = () => {
    const { id, lang } = useParams();
    const { files, refetchFiles } = useOutletContext();
    const [file, setFile] = useState(null);
    const typingTimer = useRef(null)

    useEffect(() => {
        if (!files) return;
        const fl = files.find((f) => String(f.id) === String(id)) || null
        setFile(fl)
        
    }, [files, id])



    const handleChange = (e) => {
        setFile(prev => ({ ...prev, data: e.target.value }))

        clearTimeout(typingTimer.current)

        typingTimer.current = setTimeout(() => {
            updateFile(file.data, id)
        }, 600)
        
        console.log(e.target.value)
    }

  return (
    <div className="w-screen min-h-screen bg-[#333333] absolute top-0 left-0 p-5">
        <Link to={'/'} className='absolute top-0 right-0 text-2xl text-[#dadada] hover:bg-[#892d2d] w-10 h-10 text-center'>x</Link>
        
        
        <textarea className="w-full h-[88vh] resize-none text-[#D4D4D4] focus:outline-0 bg-[#1F1F1F] rounded-xl text-[18px] font-semibold p-3 pl-5 mt-5" value={file ? file.data || "" : "Loading..."} onChange={(e) => handleChange(e)}>
            
        </textarea>
    </div>
  )
}

export default VsCode