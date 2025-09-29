import axiosInstance from "../utils/axiosInstance";

export async function getHelpCategories() {
  try {
    const res = await axiosInstance.get("/get_help_categories");
    return res.data.data;
  } catch (err) {
    throw new Error(err.message);
  }
}

export async function getHelpCategoryDetails(slug) {
  try {
    const res = await axiosInstance.post("/get_help_category_details", {
      slug,
    });
    return res.data.data;
  } catch (err) {
    console.error(err);
    throw new Error(err.message);
  }
}

export async function getPopularHelps() {
  try {
    const res = await axiosInstance.get("/get_popular_help");
    return res.data.data;
  } catch (err) {
    throw new Error(err.message);
  }
}

// search help
export async function getSearchResult(search) {
  try {
    const res = await axiosInstance.post("/get_search_result", {
      search,
    });
    return res.data.data;
  } catch (err) {
    console.error(err);
    throw new Error(err.message);
  }
}

export async function getHelpDetails(slug) {
  try {
    const res = await axiosInstance.post("/get_help_details", {
      slug,
    });
    return res.data.data;
  } catch (err) {
    console.error(err);
    throw new Error(err.message);
  }
}

export async function helpReact(reqBody) {
  try {
    const req = await axiosInstance.post("/user/help_react", reqBody);
    return req.data.data;
  } catch (error) {
    throw error.response.data.message || error;
  }
}
