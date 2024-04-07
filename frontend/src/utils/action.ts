import { axiosInstance } from "./axios-instance";

export const getAllGoods = async () => {
  const response = await axiosInstance.get("/");
  console.log(response.data);
};
