import { deleteFile } from "../../axios/filesFetch";


const DeleteFile = ({ coordinates, setCoordinates, refetchFiles }) => {
    const handleDelete = async (id) => {
        console.log("deleting id:", id, typeof id);
        try {
            await deleteFile(id)
            await refetchFiles()
            setCoordinates(null)
        } catch (e) {
            console.error(e)
        }
    }
    

    return (
        <div className="absolute bg-[#1E2025] text-white px-4 py-2 rounded shadow-lg cursor-pointer" style={{ top: coordinates.top + 10, left: coordinates.left + 10 }} onClick={() => handleDelete(coordinates.id)}>
            Delete File
        </div>
    );
};

export default DeleteFile;