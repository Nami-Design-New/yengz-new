import axiosInstance from "../utils/axiosInstance";

export default async function getProfile(id) {
  try {
    const res = await axiosInstance.post(`/get_profile?id=${id}`);
    if (res.data.code === 200) {
      return res.data.data;
    } else {
      throw new Error(res.data.message || "Error fetching profile");
    }
  } catch (error) {
    console.error("Error fetching profile:", error.message);
    throw error;
  }
}
