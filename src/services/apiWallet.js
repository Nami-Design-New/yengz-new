import axiosInstance from "../utils/axiosInstance";

export const fetchWalletOperations = async ({ page, status }) => {
  try {
    const res = await axiosInstance.post("/user/get_wallet_operations", {
      page,
      skip: 8,
      filter: status,
    });
    return {
      data: res.data.data,
      total: res.data.total,
    };
  } catch (error) {
    console.log(error);
    throw new Error(error.message);
  }
};
