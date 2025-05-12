import axiosInstance from "../utils/axiosInstance";

export async function getBlogs() {
  try {
    const req = await axiosInstance.get("/get_last_news");
    return req.data.data;
  } catch (err) {
    throw new Error(err.message);
  }
}

export async function getBlogDetails(id) {
  try {
    const req = await axiosInstance.post(`/get_last_news_data`, {
      id,
    });

    return req.data.data;
  } catch (err) {
    throw new Error(err.message);
  }
}
