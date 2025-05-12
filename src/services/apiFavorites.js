import axiosInstance from "../utils/axiosInstance";

// Function to increase view count
export const increaseViewCount = async (workId) => {
  try {
    const response = await axiosInstance.post("/user/increase_view_count", {
      id: workId,
    });
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Function to add a like to a work
export const addLike = async (workId) => {
  try {
    const response = await axiosInstance.post("/user/addLike", {
      my_work_id: workId,
    });
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Function to remove a like from a work
export const removeLike = async (workId) => {
  try {
    const response = await axiosInstance.post("/user/deleteLike", {
      my_work_id: workId,
    });
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};
