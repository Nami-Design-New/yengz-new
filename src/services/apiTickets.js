import axiosInstance from "../utils/axiosInstance";

export async function getTickets() {
  try {
    const req = await axiosInstance.get("/get_tickets");
    return req.data;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function addTicket(requestBody, queryClient) {
  try {
    const req = await axiosInstance.post("/create_ticket", requestBody);
    queryClient.invalidateQueries(["ticketsList"]);
    return req.data;
  } catch (error) {
    throw new Error(error.message);
  }
}
