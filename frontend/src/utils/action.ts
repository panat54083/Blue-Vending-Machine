import { axiosInstance } from "./axios-instance";
import { IProduct } from "./type";

export const getUser = async (name: string) => {
  const response = await axiosInstance.get("/user/" + name);
  console.log(response);
};

export const getVendingMachine = async () => {
  const response = await axiosInstance.get("/vending-machine");
  console.log(response);
};

export const getStockProducts = async (): Promise<IProduct[]> => {
  const response: IProduct[] = await axiosInstance.get(
    "/vending-machine/products"
  );
  console.log(response);
  return response;
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
