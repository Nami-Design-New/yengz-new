import axiosInstance from "../utils/axiosInstance";

export async function getComments(id) {
  try {
    const req = await axiosInstance.post("/get_comments", {
      id,
    });
    return req.data.data;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function createComment(requestBody) {
  try {
    const req = await axiosInstance.post("/user/create_comment", requestBody);
    return req.data.data;
  } catch (error) {
    throw new Error(error.message);
  }
}
