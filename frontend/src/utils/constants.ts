// Define types for coins and banknotes
export type ICurrency = {
  name: string;
  value: number; // value in THB
  amount: number; // initial amount available
};

// Define constants for coins
export const COINS: ICurrency[] = [
  { name: "1 THB", value: 1, amount: 100 },
  { name: "5 THB", value: 5, amount: 100 },
  { name: "10 THB", value: 10, amount: 100 },
];

// Define constants for banknotes
export const BANKNOTES: ICurrency[] = [
  { name: "20 THB", value: 20, amount: 100 },
  { name: "50 THB", value: 50, amount: 100 },
  { name: "100 THB", value: 100, amount: 100 },
  { name: "500 THB", value: 500, amount: 100 },
  { name: "1000 THB", value: 1000, amount: 100 },
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
