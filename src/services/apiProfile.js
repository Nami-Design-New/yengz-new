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

// Update profile API function
export const updateProfile = async (formData) => {
  try {
    const response = await axiosInstance.post(
      "/user/update_profile",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Update profile error:", error);
    throw new Error(error.message);
  }
};

export async function getUserRates(id) {
  try {
    const req = await axiosInstance.post("/get_user_rates", {
      id,
    });
    return req.data.data;
  } catch (err) {
    throw new Error(err.message);
  }
}
