import axiosInstance from "../utils/axiosInstance";

export async function getServicesByFilter(
  search,
  page,
  rate,
  user_verification,
  user_available,
  categories,
  sub_categories,
  is_old,
  skills,
  sort
) {
  const requestBody = {
    skip: 12,
  };

  if (skills?.length > 0) requestBody.skills = skills.map((id) => Number(id));
  if (page) requestBody.page = page;
  if (search) requestBody.search = search;
  if (rate !== undefined && rate !== null && rate !== "")
    requestBody.rate = rate;
  if (
    user_verification !== undefined &&
    user_verification !== null &&
    user_verification !== ""
  )
    requestBody.user_verification = user_verification;
  if (
    user_available !== undefined &&
    user_available !== null &&
    user_available !== ""
  )
    requestBody.user_available = user_available;
  if (categories?.length > 0) requestBody.categories = categories;
  if (sub_categories?.length > 0) requestBody.sub_categories = sub_categories;
  if (is_old !== undefined && is_old !== null && is_old !== "")
    requestBody.is_old = is_old;

  if (sort) requestBody.sort = sort;

  try {
    const req = await axiosInstance.post("/get_services", requestBody);
    return {
      data: req.data.data,
      total: req.data.total,
    };
  } catch (err) {
    throw new Error(err.message);
  }
}

export async function getUserServices(id) {
  try {
    const req = await axiosInstance.post("/get_user_services", {
      id,
    });
    return req.data.data;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function getServiceDetails(id) {
  try {
    const req = await axiosInstance.post("/get_service_details", {
      id,
    });
    return req.data.data;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function createService(data, queryClient) {
  try {
    const req = await axiosInstance.post("/user/create_service", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    queryClient.invalidateQueries("userServices");
    return req.data;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function updateService(data, queryClient) {
  try {
    const req = await axiosInstance.post("/user/update_service", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    queryClient.invalidateQueries("userServices");
    return req.data;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function deleteService(id, queryClient) {
  try {
    const req = await axiosInstance.post("/user/delete_service", {
      id,
    });
    queryClient.invalidateQueries("userServices");
    return req.data;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function getRates(id) {
  try {
    const req = await axiosInstance.post("/get_rates", {
      id,
    });
    return req.data;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function getComments(id) {
  try {
    const req = await axiosInstance.post("/get_comments", {
      id,
    });
    return req.data;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function createRate(data) {
  try {
    const req = await axiosInstance.post("/user/create_rate", {
      ...data,
    });
    return {
      code: req.data.code,
      message: req.data.message,
    };
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function getHomeServices() {
  try {
    const req = await axiosInstance.get("/get_home_services");
    return req.data.data;
  } catch (error) {
    throw new Error(error.message);
  }
}
