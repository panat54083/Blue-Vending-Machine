import { axiosInstance } from "./axios-instance";

export const getUser = async (name: string) => {
  const response = await axiosInstance.get("/user/" + name);
  console.log(response.data);
};

export const getStockProducts = async () => {
  const response = await axiosInstance.get("/vending-machine/products");
  console.log(response.data);
};

export const calculateChange = async (
  selectedMoney: any,
  selectedProducts: any
) => {
  const response = await axiosInstance.post("/vending-machine/change", {
    selectedMoney,
    selectedProducts,
  });
  console.log(response.data);
};
