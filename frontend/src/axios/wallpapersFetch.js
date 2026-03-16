import axios from "axios";

const API_URL = "http://localhost:5000/wallpapers";

export const getWallpapers = async () => {
  try {
    const response = await axios.get(`${API_URL}/`);
    return response.data;
  } catch (error) {
    console.error("Error fetching wallpapers:", error);
    throw error;
  }
};

export const addWallpaper = async (name, url) => {
  try {
    const response = await axios.post(`${API_URL}/`, {name, url});
    return response.data;
  } catch (error) {
    console.error("Error adding wallpaper:", error);
    throw error;
  }
};

export const updateCurrentWallpaper = async (id) => {
  try {
    const response = await axios.put(`${API_URL}/current`, {wallpaperId: id});
    return response.data;
  } catch (error) {
    console.error("Error updating current wallpaper:", error);
    throw error;
  };
};

export const deleteWallpaper = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.log("DELETE failed:", {
      status: error?.response?.status,
      data: error?.response?.data,
      message: error?.message,
    });
    throw error;
  }
};