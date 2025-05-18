import axiosInstance from "../utils/axiosInstance";

export async function getCollections() {
  try {
    const req = await axiosInstance.post("/user/get_collections");
    return req.data.data;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function getCollection(id) {
  try {
    const req = await axiosInstance.post(
      "user/get_collection_details_with_services",
      {
        id,
      }
    );
    return {
      data: req.data.data,
      count: req.data.count,
    };
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function addToCollection(requestBody, querClient) {
  try {
    const req = await axiosInstance.post(
      "/user/add_to_collection",
      requestBody
    );
    querClient.invalidateQueries("cartList");
    return req.data;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function removeCollection(requestBody) {
  try {
    await axiosInstance.post("/user/delete_collection", {
      id: requestBody,
    });
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function updateCollection(requestBody, querClient) {
  try {
    await axiosInstance.post("/user/update_collection", requestBody);
    querClient.invalidateQueries(["collectionsList"]);
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function addCollectionToCart(id) {
  try {
    const req = await axiosInstance.post("/user/add_collection_to_cart", {
      id: id,
    });
    return req.data;
  } catch (error) {
    throw new Error(error.message);
  }
}
