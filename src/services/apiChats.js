import axiosInstance from "../utils/axiosInstance";

export async function getChats() {
  try {
    const res = await axiosInstance.post("/user/get_chats");
    if (res.data.code === 200) {
      return res.data.data;
    }
  } catch (error) {
    console.error("Error fetching profile:", error.message);
  }
}

export async function getTargetChat(data) {
  try {
    const res = await axiosInstance.post("user/get_object_chat", {
      ...data,
      orderBy: "asc",
    });
    if (res.data.code === 200) {
      return res.data.data;
    }
  } catch (error) {
    console.error("Error fetching profile:", error.message);
  }
}

export const createMessage = async (data) => {
  try {
    const res = await axiosInstance.post("/user/create_message", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    if (res.data.code === 200) {
      return res.data.data;
    }
  } catch (error) {
    console.error("Error fetching profile:", error.message);
  }
};
