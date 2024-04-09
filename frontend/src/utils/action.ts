import { axiosInstance } from "./axios-instance";
import { ICoinBanknote, IProduct } from "./types";

export const getVendingMachine = async () => {
  const response = await axiosInstance.get("/vending-machine");
};

export const getStockProducts = async (): Promise<IProduct[]> => {
  const response: IProduct[] = await axiosInstance.get("/products");
  return response;
};

export const calculateChange = async (
  selectedCoinBanknotes: ICoinBanknote[],
  selectedProducts: IProduct[]
) => {
  console.log(selectedCoinBanknotes, selectedProducts);
  // const response = await axiosInstance.post("/vending-machine/change", {
  //   selectedMoney,
  //   selectedProducts,
  // });
  // console.log(response);
};

export const getCoinBanknotes = async (): Promise<ICoinBanknote[]> => {
  const response: ICoinBanknote[] = await axiosInstance.get("/coin-banknotes");
  return response;
};
