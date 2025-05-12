import axiosInstance from "../utils/axiosInstance";

export default async function getSettings() {
  try {
    const response = await axiosInstance.get("/get_settings");
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
}
