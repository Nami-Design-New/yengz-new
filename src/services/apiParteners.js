import axiosInstance from "../utils/axiosInstance";

export async function getParteners() {
  try {
    const req = await axiosInstance.get("/get_partners");
    return req.data.data;
  } catch (err) {
    throw new Error(err.message);
  }
}
