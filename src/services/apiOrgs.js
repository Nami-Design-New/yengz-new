import axiosInstance from "../utils/axiosInstance";

export async function getOrgs() {
  try {
    const req = await axiosInstance.get("/user/get_my_companies");
    return req.data.data;
  } catch (err) {
    throw new Error(err.message);
  }
}
export async function getCompanyCategory() {
  try {
    const req = await axiosInstance.get("/get_company_categories");
    return req.data.data;
  } catch (err) {
    throw new Error(err.message);
  }
}


export async function getCompanyDetails(userName) {
  try {
    const req = await axiosInstance.post("/user/get_company_details", { user_name: userName });
    return req.data.data;
  } catch (err) {
    throw new Error(err.message);
  }
}
