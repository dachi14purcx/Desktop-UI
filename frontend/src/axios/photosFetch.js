import axios from "axios";

const API_URL = "http://localhost:5000/photos";

export const getPhotos = async () => {
  try {
    const response = await axios.get(`${API_URL}/`);
    return response.data;
  } catch (error) {
    console.error("Error fetching Photos:", error);
    throw error;
  }
};

export const addPhoto = async (file) => {
  try {
    const formData = new FormData();
    formData.append("image", file);
    const response = await axios.post(`${API_URL}/`, formData);
    return response.data;
  } catch (error) {
    console.log("POST failed:", {
      status: error?.response?.status,
      data: error?.response?.data,
      message: error?.message,
    });
    throw error;
  }
};

export const deletePhoto = async (id) => {
  try {
    const response = await axios.delete(API_URL + '/' + String(id));
    return response.data;
  } catch (error) {
    console.error("Error deleting Photo:", error);
    throw error;
  };
};