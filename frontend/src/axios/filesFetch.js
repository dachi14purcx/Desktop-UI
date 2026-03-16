import axios from "axios";

const API_URL = "http://localhost:5000/files";

export const getFiles = async () => {
  try {
    const response = await axios.get(`${API_URL}/`);
    return response.data;
  } catch (error) {
    console.error("Error fetching files:", error);
    throw error;
  }
};

export const addFile = async (name, type) => {
  try {
    const response = await axios.post(`${API_URL}/`, {name, type});
    return response.data;
  } catch (error) {
    console.error("Error adding file:", error);
    throw error;
  }
};

export const updateFile = async (data, fileId) => {
  try {
    console.log(data)
    const response = await axios.put(`${API_URL}/data`, {data, fileId});
    return response.data;
  } catch (error) {
    console.error("Error updating file:", error);
    throw error;
  };
};

export const deleteFile = async (id) => {
  try {
    const response = await axios.delete(API_URL + '/' + String(id));
    return response.data;
  } catch (error) {
    console.error("Error deleting file:", error);
    throw error;
  };
};