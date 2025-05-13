import axiosInstance from "../utils/axiosInstance";

export async function getCart() {
  try {
    const req = await axiosInstance.post("/user/get_cart");
    return req.data;
  } catch (err) {
    throw new Error(err.response?.data?.message || err.message);
  }
}

export async function addToCart(data, querClient) {
  try {
    await axiosInstance.post("/user/add_to_cart", data);
    querClient.invalidateQueries("cartList");
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message);
  }
}

export async function deleteCart(querClient) {
  try {
    await axiosInstance.post("/user/delete_cart");
    querClient.invalidateQueries("cartList");
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message);
  }
}

export async function increaseCartQuantity(id, queryClient) {
  try {
    await axiosInstance.post("/user/increase_cart", { id });
    queryClient.invalidateQueries("cartList");
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message);
  }
}

export async function decreaseCartQuantity(id, queryClient) {
  try {
    await axiosInstance.post("/user/decrease_cart", { id });
    queryClient.invalidateQueries("cartList");
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message);
  }
}

export async function deleteCartItem(id, queryClient) {
  try {
    await axiosInstance.post("/user/decrease_cart", { id, quantity: 0 });
    queryClient.invalidateQueries("cartList");
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message);
  }
}

export async function updateDevelopmentsInCart(data, queryClient) {
  try {
    await axiosInstance.post("/user/update_development_cart", { ...data });
    queryClient.invalidateQueries("cartList");
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message);
  }
}
