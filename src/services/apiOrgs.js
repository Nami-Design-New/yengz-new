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
    const req = await axiosInstance.post("/user/get_company_details", {
      user_name: userName,
    });
    return req.data.data;
  } catch (err) {
    throw new Error(err.message);
  }
}
export async function getCompanyDetailsSimple(userName) {
  try {
    const req = await axiosInstance.post("/user/get_company_details_simple", {
      user_name: userName,
    });
    return req.data.data;
  } catch (err) {
    throw new Error(err.message);
  }
}
export async function getFirstTeamMembers(userName) {
  try {
    const req = await axiosInstance.post("/user/get_first_team_members", {
      user_name: userName,
    });
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

export async function changeSponsor(requestBody) {
  try {
    const req = await axiosInstance.post("/user/change_sponsor", requestBody);

    return req.data.data;
  } catch (error) {
    throw new Error(error.message);
  }
}
export async function createCompany(requestBody) {
  try {
    const req = await axiosInstance.post("/user/create_company", requestBody);
    return req.data.data;
  } catch (error) {
    throw error.response.data.message || error;
  }
}
export async function updateCompany(requestBody) {
  try {
    const req = await axiosInstance.post("/user/update_company", requestBody);
    return req.data.data;
  } catch (error) {
    throw error.response.data.message || error;
  }
}
export async function deleteCompany(requestBody) {
  try {
    const req = await axiosInstance.post("/user/delete_company", requestBody);
    return req.data.data;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function createCompanyTeam(requestBody) {
  try {
    const req = await axiosInstance.post(
      "/user/create_company_team",
      requestBody
    );
    return req.data.data;
  } catch (error) {
    throw error.response.data.message || error;
  }
}

// get_company_team
export async function getCompanyTeam(userName) {
  try {
    const req = await axiosInstance.post("/user/get_company_teams", {
      user_name: userName,
    });
    return req.data.data;
  } catch (err) {
    throw new Error(err.message);
  }
}
// Members
export async function getTeamMembers(userName, teamId) {
  try {
    const req = await axiosInstance.post("/user/get_team_members", {
      user_name: userName,
      team_id: teamId,
    });
    return req.data.data;
  } catch (err) {
    throw new Error(err.message);
  }
}
export async function deleteMember(requestBody) {
  try {
    const req = await axiosInstance.post("/user/delete_member", requestBody);
    return req.data.data;
  } catch (error) {
    throw new Error(error.message);
  }
}
export async function deleteCompanyTeam(requestBody) {
  try {
    const req = await axiosInstance.post(
      "/user/delete_company_team",
      requestBody
    );
    return req.data.data;
  } catch (error) {
    throw new Error(error.message);
  }
}
//get team update details
export async function getTeamUpdateDetails(userName, teamId) {
  try {
    const req = await axiosInstance.post("/user/get_team_update_details", {
      user_name: userName,
      team_id: teamId,
    });
    return req.data.data;
  } catch (err) {
    throw new Error(err.message);
  }
}
export async function updateCompanyTeam(requestBody) {
  try {
    const req = await axiosInstance.post(
      "/user/update_company_team",
      requestBody
    );
    return req.data.data;
  } catch (error) {
    throw error.response.data.message || error;
  }
}

/// get_company_add_member_teams || get_user_user_name_email

// get_company_add_member_teams
export async function getCompanyAddMemberTeams(userName) {
  try {
    const req = await axiosInstance.post("/user/get_company_add_member_teams", {
      user_name: userName,
    });
    return req.data.data;
  } catch (err) {
    throw new Error(err.message);
  }
}

// get_user_user_name_email
export async function getUserUserNameEmail(searchEmail) {
  try {
    const req = await axiosInstance.post("/get_user_user_name_email", {
      search: searchEmail,
    });
    return req.data.data;
  } catch (err) {
    throw new Error(err.message);
  }
}

export async function inviteUserNameMembers(requestBody) {
  try {
    const req = await axiosInstance.post(
      "/user/invite_user_name_members",
      requestBody
    );
    return req.data.data;
  } catch (error) {
    throw error.response.data.message || error;
  }
}
export async function createInvitationLinks(requestBody) {
  try {
    const req = await axiosInstance.post(
      "/user/create_invitation_links",
      requestBody
    );
    return req.data.data;
  } catch (error) {
    throw error.response.data.message || error;
  }
}

// apply_invitation_links

export async function applyInvitationLinks(requestBody) {
  try {
    const req = await axiosInstance.post(
      "/user/apply_invitation_links",
      requestBody
    );
    return req.data.data;
  } catch (error) {
    throw error.response.data.message || error;
  }
}

// get_company_chats
export async function getCompanyChats(userName) {
  try {
    const req = await axiosInstance.post("/user/get_company_chats", {
      user_name: userName,
    });
    return req.data.data;
  } catch (err) {
    throw new Error(err.message);
  }
}

// get_company_members
export async function getCompanyMembers(
  userName,
  search,
  last_login,
  verified
) {
  try {
    const req = await axiosInstance.post("/user/get_company_members", {
      user_name: userName,
      search,
      verified,
      last_login,
    });
    return req.data.data;
  } catch (err) {
    throw new Error(err.message);
  }
}
// get_company_freelancers
export async function getCompanyFreelancers(userName, search) {
  try {
    const req = await axiosInstance.post("/user/get_company_freelancers", {
      user_name: userName,
      search,
    });
    return req.data.data;
  } catch (err) {
    throw new Error(err.message);
  }
}
// get_company_payments
export async function getCompanyPayments(userName,) {
  try {
    const req = await axiosInstance.post("/user/get_company_payments", {
      user_name: userName,
    });
    return req.data.data;
  } catch (err) {
    throw new Error(err.message);
  }
}
