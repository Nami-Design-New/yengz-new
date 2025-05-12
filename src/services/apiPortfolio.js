import axiosInstance from "../utils/axiosInstance";

export async function searchWorks(search, skills, duration, sort, page) {
  try {
    const payload = {};
    if (search) payload.search = search;
    if (skills) payload.skills = skills.map((id) => Number(id));
    if (duration) payload.duration = duration;
    if (sort) payload.sort = sort;

    const response = await axiosInstance.post("search_works", {
      ...payload,
      page,
    });
    if (response.data.code === 200) {
      return {
        data: response.data.data,
        total: response.data.total,
      };
    }
  } catch (error) {
    throw new Error(error.message);
  }
}
