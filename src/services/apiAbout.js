import axiosInstance from "../utils/axiosInstance";

export async function getAbout() {
  try {
    const req = await axiosInstance.get("/get_about_app");
    return req.data.data;
  } catch (err) {
    throw new Error(err.message);
  }
}

export async function getAboutCategory(id) {
  try {
    const req = await axiosInstance.post("/get_about_app_categories", { id });
    return req.data.data;
  } catch (err) {
    throw new Error(err.message);
  }
}

export async function getAboutData(id) {
  try {
    const req = await axiosInstance.post("/get_about_app_data", { id });
    return req.data.data;
  } catch (err) {
    throw new Error(err.message);
  }
}

export async function getOurPartner() {
  try {
    const req = await axiosInstance.get("/get_partners");
    return req.data.data;
  } catch (err) {
    throw new Error(err.message);
  }
}
