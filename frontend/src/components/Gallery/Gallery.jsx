import React, { useEffect, useMemo, useState } from "react";
import { getPhotos, deletePhoto } from "../../axios/photosFetch";

const Gallery = () => {
  const [photos, setPhotos] = useState([])
  const [index, setIndex] = useState(0)
  const [loading, setLoading] = useState(false)

  const refetchPhotos = async () => {
    try {
      setLoading(true)
      const response = await getPhotos()
      const list = response.data
      setPhotos(list)

      setIndex((prev) => {
        if (list.length === 0) return 0
        return Math.min(prev, list.length - 1)
      })
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    refetchPhotos()
  }, [])

  const current = useMemo(() => {
    if (!photos.length) return null
    return photos[index]
  }, [photos, index])

  const goNext = () => {
    if (!photos.length) return
    setIndex((i) => (i + 1) % photos.length)
  }

  const goPrev = () => {
    if (!photos.length) return
    setIndex((i) => (i - 1 + photos.length) % photos.length)
  }

  const handleDelete = async () => {
    if (!current) return
    try {
      await deletePhoto(current.id)

      setPhotos((prev) => {
        const next = prev.filter((p) => p.id !== current.id)

        setIndex((i) => {
          if (next.length === 0) return 0
          if (i >= next.length) return next.length - 1
          return i
        })

        return next
      })
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <div className="w-screen h-screen bg-[#1e1e1e] absolute left-0 top-0 flex items-center justify-center pb-13">
      {loading && (
        <p className="text-white text-lg font-semibold">Loading...</p>
      )}

      {!loading && !current && (
        <p className="text-white text-lg font-semibold">No photos</p>
      )}

      {!loading && current && (
        <div className="w-full h-full flex items-center justify-center relative">
          <img
            src={current.url || current.src}
            alt={current.name || "photo"}
            className="max-w-[92vw] max-h-[80vh] object-contain rounded-xl shadow-2xl select-none"
            draggable={false}
          />

          <button
            onClick={goPrev}
            className="absolute left-5 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/50 text-white text-2xl flex items-center justify-center hover:bg-black/70 active:scale-95"
            aria-label="Previous"
            title="Previous"
          >
            ‹
          </button>

          <button
            onClick={goNext}
            className="absolute right-5 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/50 text-white text-2xl flex items-center justify-center hover:bg-black/70 active:scale-95"
            aria-label="Next"
            title="Next"
          >
            ›
          </button>

          <div className="absolute bottom-6 flex items-center gap-3">
            <div className="text-white/80 text-sm font-semibold">
              {index + 1} / {photos.length}
            </div>

            <button
              onClick={handleDelete}
              className="px-4 py-2 rounded-lg bg-red-600 text-white font-semibold hover:bg-red-700 active:scale-[0.98]"
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery