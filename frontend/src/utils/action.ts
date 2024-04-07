import { axiosInstance } from "./axios-instance";

export const getStockProducts = async () => {
  const response = await axiosInstance.get("/products");
  console.log(response.data);
};
