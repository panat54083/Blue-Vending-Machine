// Define types for coins and banknotes
export type ICurrency = {
  name: string;
  value: number; // value in THB
  quantity: number; // initial amount available
};

export const COINS: ICurrency[] = [
  { name: "OneTHB", value: 1, quantity: 100 },
  { name: "FiveTHB", value: 5, quantity: 100 },
  { name: "TenTHB", value: 10, quantity: 100 },
];

export const BANKNOTES: ICurrency[] = [
  { name: "TwentyTHB", value: 20, quantity: 100 },
  { name: "FiftyTHB", value: 50, quantity: 100 },
  { name: "HundredTHB", value: 100, quantity: 100 },
  { name: "FiveHundredTHB", value: 500, quantity: 100 },
  { name: "ThousandTHB", value: 1000, quantity: 100 },
];

// Define type for goods
export type IProduct = {
  name: string;
  price: number; // price in THB
  stock: number;
};

// Define constants for goods
export const GOODS: IProduct[] = [
  { name: "Soda", price: 20, stock: 10 },
  { name: "Chips", price: 30, stock: 15 },
  { name: "Chocolate", price: 25, stock: 20 },
  { name: "Water", price: 15, stock: 12 },
  { name: "Candy", price: 10, stock: 25 },
];
