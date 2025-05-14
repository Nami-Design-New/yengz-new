import axiosInstance from "../utils/axiosInstance";

export async function getCertificates(userId) {
  try {
    const req = await axiosInstance.post("/get_certificates", {
      id: userId,
    });
    return req.data.data;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function addCertificate(data, queryClient) {
  try {
    await axiosInstance.post("/user/create_certificate", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    queryClient.invalidateQueries(["userCertificates"]);
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function updateCertificate(data, queryClient) {
  try {
    await axiosInstance.post("/user/update_certificate", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    queryClient.invalidateQueries(["userCertificates"]);
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function deleteCertificate(id) {
  try {
    await axiosInstance.post("/user/delete_certificate", {
      id,
    });
  } catch (error) {
    throw new Error(error.message);
  }
}
