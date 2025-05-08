import axiosInstance from "../utils/axiosInstance";

export async function getPaymentMethods() {
  try {
    const req = await axiosInstance.get("/get_payments");
    return req.data.data;
  } catch (err) {
    throw new Error(err.message);
  }
}
