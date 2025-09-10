import axiosInstance from "../utils/axiosInstance";

export async function getFaqs() {
  try {
    const req = await axiosInstance.get("/get_help_faq");
    return req.data.data;
  } catch (err) {
    throw new Error(err.message);
  }
}

