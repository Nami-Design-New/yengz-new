import axiosInstance from "../utils/axiosInstance";

export async function getNotifications() {
  try {
    const req = await axiosInstance.post("/get_notifications");
    return req?.data?.data;
  } catch (err) {
    throw new Error(err.message);
  }
}
