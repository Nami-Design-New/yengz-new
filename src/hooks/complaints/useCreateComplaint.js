import { useMutation } from "@tanstack/react-query";
import { createComplaint } from "../../services/apiComplaints";

export const useCreateComplaint = () => {
  return useMutation({
    mutationFn: createComplaint,
  });
};
