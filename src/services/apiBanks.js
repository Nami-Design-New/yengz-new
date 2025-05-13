import axiosInstance from "../utils/axiosInstance";

export async function getBanks() {
  try {
    const req = await axiosInstance.get("/user/get_banks");
    return req.data.data;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function createWithdraw(requestBody, queryClient) {
  try {
    await axiosInstance.post(
      "/user/create_withdraw_balance_request",
      requestBody
    );
    queryClient.invalidateQueries(["profile"]);
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function deleteBank(id, queryClient) {
  try {
    await axiosInstance.post("/user/delete_bank", {
      id,
    });
    queryClient.invalidateQueries(["banksList"]);
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function addBank(requestBody, querClinet) {
  try {
    const req = await axiosInstance.post("/user/create_bank", requestBody);
    querClinet.invalidateQueries(["banksList"]);
    return req.data.data;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function editBank(requestBody, querClinet) {
  try {
    const req = await axiosInstance.post("/user/update_bank", requestBody);
    querClinet.invalidateQueries(["banksList"]);
    return req.data.data;
  } catch (error) {
    throw new Error(error.message);
  }
}
