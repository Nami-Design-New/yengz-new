import axiosInstance from "../utils/axiosInstance";

// get_company_chats
export async function getCompanyChats({
  user_name,
  search,
  company_team_ids,
  member_name,
  freelance_name,
}) {
  try {
    const payload = { user_name }; // لازم موجود دايمًا

    if (search) payload.search = search;
    if (company_team_ids?.length) payload.company_team_ids = company_team_ids;
    if (member_name) payload.member_name = member_name;
    if (freelance_name) payload.freelance_name = freelance_name;

    const req = await axiosInstance.post("/user/get_company_chats", payload);
    return req.data.data;
  } catch (err) {
    throw new Error(err.message);
  }
}


// get_company_members
export async function getCompanyMembers({
  user_name,
  search,
  last_login,
  verified,
  job_title,
  skills,
  categories,
  company_team_ids,
  country_id,
}) {
  try {
    const payload = { user_name }; // link دايمًا موجود

    // نضيف بس القيم اللي المستخدم اختارها
    if (search) payload.search = search;
    if (last_login) payload.last_login = last_login;
    if (verified) payload.verified = verified;
    if (job_title) payload.job_title = job_title;
    if (skills?.length) payload.skills = skills;
    if (categories?.length) payload.categories = categories;
    if (company_team_ids?.length) payload.company_team_ids = company_team_ids;
    if (country_id) payload.country_id = country_id;

    const req = await axiosInstance.post("/user/get_company_members", payload);
    return req.data.data;
  } catch (err) {
    throw new Error(err.message);
  }
}

// get_company_freelancers
export async function getCompanyFreelancers(filters) {
  try {
    // لازم user_name
    if (!filters?.user_name) {
      throw new Error("user_name is required");
    }

    // تجهيز البودي: user_name + باقي الفلاتر لو موجودة
    const payload = { user_name: filters.user_name };

    if (filters.search) payload.search = filters.search;
    if (filters.categories?.length) payload.categories = filters.categories;
    if (filters.skills?.length) payload.skills = filters.skills;
    if (filters.rate) payload.rate = filters.rate;
    if (filters.job_title) payload.job_title = filters.job_title;
    if (filters.verified) payload.verified = filters.verified;
    if (filters.last_login) payload.last_login = filters.last_login;
    if (filters.country_id) payload.country_id = filters.country_id;
    if (filters.company_team_ids?.length)
      payload.company_team_ids = filters.company_team_ids;

    const req = await axiosInstance.post("/user/get_company_freelancers", payload);
    return req.data.data;
  } catch (err) {
    throw new Error(err.message);
  }
}


// get_company_payments
export async function getCompanyPayments({
  user_name,
  operations,
  company_team_ids,
  from_date,
  to_date,
  user_id,
}) {
  try {
    const payload = { user_name }; 

    if (operations?.length) payload.operations = operations;
    if (company_team_ids?.length) payload.company_team_ids = company_team_ids;
    if (from_date) payload.from_date = from_date;
    if (to_date) payload.to_date = to_date;
    if (user_id) payload.user_id = user_id;

    const req = await axiosInstance.post("/user/get_company_payments", payload);
    return req.data.data;
  } catch (err) {
    throw new Error(err.message);
  }
}

export async function getCompanyProjects({
  user_name,
  search,
  company_team_ids,
  member_name,
  freelance_name,
  status,
}) {
  try {
    const payload = { user_name }; // دايمًا إلزامي

    if (search) payload.search = search;
    if (company_team_ids?.length) payload.company_team_ids = company_team_ids;
    if (member_name) payload.member_name = member_name;
    if (freelance_name) payload.freelance_name = freelance_name;
    if (status?.length) payload.status = status;

    const req = await axiosInstance.post("/user/get_company_projects", payload);
    return req.data.data;
  } catch (err) {
    throw new Error(err.message);
  }
}
