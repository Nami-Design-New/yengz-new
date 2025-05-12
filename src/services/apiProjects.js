import axiosInstance from "../utils/axiosInstance";

export async function getProjectsByFilter(
  search,
  page,
  categories,
  sub_categories,
  duration_from,
  duration_to,
  price_from,
  price_to,
  sort
) {
  const requestBody = {};

  if (page) requestBody.page = page;
  if (search) requestBody.search = search;
  if (categories?.length > 0) requestBody.categories = categories;
  if (sub_categories?.length > 0) requestBody.sub_categories = sub_categories;
  if (duration_from) requestBody.duration_from = duration_from;
  if (duration_to) requestBody.duration_to = duration_to;
  if (price_from) requestBody.price_from = price_from;
  if (price_to) requestBody.price_to = price_to;
  if (sort) requestBody.sort = sort;

  try {
    const req = await axiosInstance.post("/get_projects", requestBody);
    return {
      data: req.data.data,
      total: req.data.total,
    };
  } catch (err) {
    throw new Error(err.message);
  }
}

export async function getUserProjects(id) {
  try {
    const req = await axiosInstance.post("/get_my_projects", {
      user_id: id,
    });
    return req.data.data;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function getMyProjectRequests(sort) {
  const requestBody = {};

  if (sort) requestBody.sort = sort;

  try {
    const req = await axiosInstance.get(
      "/user/get_my_project_requests",
      requestBody
    );
    return req.data.data;
  } catch (error) {
    throw new Error(error.message);
  }
}

export const createProject = async (data, queryClient) => {
  try {
    await axiosInstance.post("/user/create_project", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    queryClient.invalidateQueries(["userProjects"]);
  } catch (error) {
    throw new Error(error.message);
  }
};

export const editProject = async (data, queryClient) => {
  try {
    await axiosInstance.post("/user/update_project", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    queryClient.invalidateQueries(["userProjects"]);
  } catch (error) {
    throw new Error(error.message);
  }
};

export async function deleteProject(id, queryClient) {
  try {
    await axiosInstance.post("/user/delete_project", {
      id,
    });
    queryClient.invalidateQueries(["userProjects"]);
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function getLatestProjects() {
  try {
    const req = await axiosInstance.post("/get_projects", {
      page: 1,
    });
    return req.data.data;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function getProjectById(id) {
  try {
    const req = await axiosInstance.post("/get_project_details", {
      id,
    });
    return req.data.data;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function getProjectRequests(id, type) {
  try {
    const req = await axiosInstance.post(
      `${type === "global" ? "" : "/user"}/get_project_request`,
      {
        id,
      }
    );
    return req.data.data;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function getProjectsOrders({ page, status }) {
  const requestBody = {};
  if (page) requestBody.page = page;
  if (status) requestBody.status = status;
  try {
    const req = await axiosInstance.post(
      "/user/get_project_orders",
      requestBody
    );
    return {
      data: req.data.data,
      total: req.data.total,
    };
  } catch (err) {
    throw new Error(err.message);
  }
}

export async function addProjectRequest(data, querClinet) {
  try {
    await axiosInstance.post("/user/create_request", data);
    querClinet.invalidateQueries(["projectRequests"]);
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function editProjectRequest(data, querClinet) {
  try {
    await axiosInstance.post("/user/update_request", data);
    querClinet.invalidateQueries(["projectRequests"]);
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function updateRequestStatus(id, status, querClinet) {
  try {
    await axiosInstance.post("/user/change_request_status", {
      id,
      status,
    });
    querClinet.invalidateQueries(["projectRequests"]);
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function updateProject(id, status, queryClient) {
  try {
    await axiosInstance.post("/user/update_project_order", {
      id: id,
      status: status,
    });
    queryClient.invalidateQueries("project", "projectsOrdersList");
  } catch (error) {
    throw new Error(error.message);
  }
}
