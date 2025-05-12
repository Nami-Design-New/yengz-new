import axiosInstance from "../utils/axiosInstance";

export async function getFreelancers(
  search,
  page,
  rate,
  verified,
  last_login,
  categories,
  job_title,
  add_request_in_my_projects,
  skills
) {
  const requestBody = {};

  if (skills?.length > 0) requestBody.skills = skills.map((id) => Number(id));
  if (page) requestBody.page = page;
  if (search) requestBody.search = search;
  if (rate !== undefined && rate !== null && rate !== "")
    requestBody.rate = rate;
  if (
    verified !== undefined &&
    verified !== null &&
    verified !== "" &&
    Number(verified) !== 0
  )
    requestBody.verified = verified;
  if (
    last_login !== undefined &&
    last_login !== null &&
    last_login !== "" &&
    Number(last_login) !== 0
  )
    requestBody.last_login = last_login;
  if (categories?.length > 0) requestBody.categories = categories;
  if (job_title) requestBody.job_title = job_title;
  if (
    add_request_in_my_projects !== undefined &&
    add_request_in_my_projects !== null &&
    add_request_in_my_projects !== "" &&
    Number(add_request_in_my_projects) !== 0
  )
    requestBody.add_request_in_my_projects = add_request_in_my_projects;

  try {
    const req = await axiosInstance.post("/get_freelancers", requestBody);
    return {
      data: req.data.data,
      total: req.data.total,
    };
  } catch (err) {
    throw new Error(err.message);
  }
}
