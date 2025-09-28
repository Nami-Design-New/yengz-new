import axiosInstance from "../utils/axiosInstance";

export async function getTickets() {
  try {
    const req = await axiosInstance.get("/get_tickets");
    return req.data;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function addTicket(requestBody) {
  try {
    const req = await axiosInstance.post("/create_ticket", requestBody);
    return req.data;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function getTicketsCategory() {
  try {
    const req = await axiosInstance.get("/get_ticket_category");
    return req.data.data;
  } catch (error) {
    throw new Error(error.message);
  }
}
