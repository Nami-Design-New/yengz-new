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
export async function getCompanyDetailsSimple(userName) {
  try {
    const req = await axiosInstance.post("/user/get_company_details_simple", { user_name: userName });
    return req.data.data;
  } catch (err) {
    throw new Error(err.message);
  }
}
export async function getFirstTeamMembers(userName) {
  try {
    const req = await axiosInstance.post("/user/get_first_team_members", { user_name: userName });
    return req.data.data;
  } catch (err) {
    throw new Error(err.message);
  }
}

export async function acceptSponsorInvitation(requestBody, querClinet) {
  try {
    const req = await axiosInstance.post(
      "/user/accept_sponsor_invitation",
      requestBody
    );
    querClinet.invalidateQueries(["acceptInvitation"]);
    return req.data.data;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function rejectSponsorInvitation(requestBody, querClinet) {
  try {
    const req = await axiosInstance.post(
      "/user/reject_sponsor_invitation",
      requestBody
    );
    querClinet.invalidateQueries(["rejectInvitation"]);
    return req.data.data;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function changeSponsor(requestBody ) {
  try {
    const req = await axiosInstance.post(
      "/user/change_sponsor",
      requestBody
    );
   
    return req.data.data;
  } catch (error) {
    throw new Error(error.message);
  }
}
