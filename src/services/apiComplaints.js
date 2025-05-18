import axiosInstance from "../utils/axiosInstance";

export const createComplaint = async (formData) => {
  const response = await axiosInstance.post(
    "/user/create_complaint",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return response.data;
};
