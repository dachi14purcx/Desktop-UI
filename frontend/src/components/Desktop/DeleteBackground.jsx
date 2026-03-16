import { deleteWallpaper } from "../../axios/wallpapersFetch";


const DeleteBackground = ({ coordinates, setCoordinates, refetchWallpapers }) => {
    const handleDelete = async (id) => {
        console.log("deleting id:", id, typeof id);
        try {
            await deleteWallpaper(id)
            await refetchWallpapers()
            setCoordinates(null)
        } catch (e) {
            console.error(e)
        }
    }
    

    return (
        <div className="absolute bg-[#1E2025] text-white px-4 py-2 rounded shadow-lg cursor-pointer" style={{ top: coordinates.top + 10, left: coordinates.left + 10 }} onClick={() => handleDelete(coordinates.id)}>
            Delete background
        </div>
    );
};

export default DeleteBackground;