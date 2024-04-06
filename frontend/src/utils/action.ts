import { axiosInstance } from "./axios-instance";

export const getHelloWorld = async () => {
  const response = await axiosInstance.get("/");
  console.log(response.data);
};
