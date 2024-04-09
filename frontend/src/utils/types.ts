// Define types for coins and banknotes
export type ICoinBanknote = {
  id: number;
  name: string;
  value: number; // value in THB
  type: "BANKNOTE" | "COIN";
  stock: number;
};

// Define type for goods
export type IProduct = {
  id: string;
  name: string;
  price: number; // price in THB
  stock: number;
};

