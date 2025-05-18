import * as yup from "yup";

export const complaintSchema = yup.object({
  title: yup.string().required("Title is required"),
  message: yup.string().required("Message is required"),
  type: yup.string().required("Type is required"),
  images: yup.array().of(
    yup.mixed().test("fileSize", "File size is too large", (value) => {
      if (!value) return true;
      return value.size <= 5000000; // 5MB
    })
  ),
});
