import { axiosInstance } from "./axios-instance";
import { ICoinBanknote, IProduct } from "./types";

export const getStockProducts = async (): Promise<IProduct[]> => {
  const response: IProduct[] = await axiosInstance.get("/products");
  return response;
};

export const calculateChange = async (
  selectedCoinBanknotes: ICoinBanknote[],
  selectedProducts: IProduct[]
): Promise<{ message: string; change: ICoinBanknote[] }> => {
  const response: { message: string; change: ICoinBanknote[] } =
    await axiosInstance.post("/vending-machine/purchase-product", {
      coinBanknotes: selectedCoinBanknotes,
      products: selectedProducts,
    });
  return response;
};

export const getCoinBanknotes = async (): Promise<ICoinBanknote[]> => {
  const response: ICoinBanknote[] = await axiosInstance.get("/coin-banknotes");
  return response;
};

export const getAllCoinBanknotes = async (): Promise<ICoinBanknote[]> => {
  const response: ICoinBanknote[] = await axiosInstance.get("/coin-banknotes/");
  return response;
};
