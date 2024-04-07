// Define types for coins and banknotes
export type ICurrency = {
  name: string;
  value: number; // value in THB
  amount: number; // initial amount available
};

export const COINS: ICurrency[] = [
  { name: "OneTHB", value: 1, amount: 100 },
  { name: "FiveTHB", value: 5, amount: 100 },
  { name: "TenTHB", value: 10, amount: 100 },
];

export const BANKNOTES: ICurrency[] = [
  { name: "TwentyTHB", value: 20, amount: 100 },
  { name: "FiftyTHB", value: 50, amount: 100 },
  { name: "HundredTHB", value: 100, amount: 100 },
  { name: "FiveHundredTHB", value: 500, amount: 100 },
  { name: "ThousandTHB", value: 1000, amount: 100 },
];

// Define type for goods
export type IGoods = {
  name: string;
  price: number; // price in THB
  quantity: number; // initial quantity available
};

// Define constants for goods
export const GOODS: IGoods[] = [
  { name: "Soda", price: 20, quantity: 10 },
  { name: "Chips", price: 30, quantity: 15 },
  { name: "Chocolate", price: 25, quantity: 20 },
  { name: "Water", price: 15, quantity: 12 },
  { name: "Candy", price: 10, quantity: 25 },
];
