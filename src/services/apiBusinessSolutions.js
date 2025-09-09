import axiosInstance from "../utils/axiosInstance";

export async function getSolutions() {
  try {
    const req = await axiosInstance.get("/get_solutions");
    return req.data.data;
  } catch (err) {
    throw new Error(err.message);
  }
}

export async function getSolution(slug) {
  try {
    const req = await axiosInstance.post(`/get_solution`, {
      slug,
    });
    return req.data.data;
  } catch (err) {
    throw new Error(err.message);
  }
}