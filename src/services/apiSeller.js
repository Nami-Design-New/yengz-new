// src/services/apiSeller.js
import axiosInstance from "../utils/axiosInstance";

// جلب كل الـ categories
export async function getExtraCategories() {
  try {
    const res = await axiosInstance.get("/get_extra_categories");
    return res.data.data;
  } catch (err) {
    throw new Error(err.response?.data?.message || err.message);
  }
}

export async function getSellerDetails(slug) {
  try {
    const res = await axiosInstance.post("/get_extra_category_details", {
      slug,
    });
    return res.data.data;
  } catch (err) {
    throw new Error(err.response?.data?.message || err.message);
  }
}
