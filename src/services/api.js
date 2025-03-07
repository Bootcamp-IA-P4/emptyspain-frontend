import axios from "axios";

const API_URL = "http://localhost:8000/api/pueblos/";

export const getPueblos = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching pueblos:", error);
    return [];
  }
};

export const addPueblo = async (puebloData) => {
  try {
    const response = await axios.post(API_URL, puebloData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error adding pueblo:", error);
    throw new Error("No se pudo agregar el pueblo");
  }
};
