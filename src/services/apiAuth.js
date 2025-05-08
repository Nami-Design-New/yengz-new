import axiosInstance from "../utils/axiosInstance";

// API call to login user
export const loginUser = async (credentials) => {
  const response = await axiosInstance.post("/user/login", credentials);
  return response.data;
};

// Set the authentication token in axios headers
export const setAuthToken = (token) => {
  axiosInstance.defaults.headers.common["Authorization"] = token;
};

// Register API Logic
export const registerUser = async (data) => {
  const response = await axiosInstance.post("/user/can_register", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

// Confirm OTP API Logic
export const confirmOtp = async (data) => {
  const response = await axiosInstance.post("/user/check_code", data, {
    headers: {
      Accept: "application/json",
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

// Check email AOI logic

export const checkEmail = async (data) => {
  const response = await axiosInstance.post("/user/check_email", data);
  return response.data;
};

// UPdate Password API Logic

export const updatePassword = async (data) => {
  const response = await axiosInstance.post("/user/update_password", data);
  return response.data;
};

// Logout API Logic

/**
 * Service function to handle user logout API call
 * @param {string} token - The user's authentication token
 * @returns {Promise} - The API response
 */
export const logoutUser = async (token) => {
  try {
    const response = await axiosInstance.post("/user/logout", { token });
    return response;
  } catch (error) {
    console.error("Logout error:", error);
    throw new Error(error.message);
  }
};

// Delete Account  API Logic
/**
 * @returns
 */
export const deleteAccount = async () => {
  const response = await axiosInstance.post("/user/delete_account");
  if (response.data.code !== 200) {
    throw new Error("delete account failed");
  }
  return response.data;
};
