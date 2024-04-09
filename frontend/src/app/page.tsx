"use client";

import { ICoinBanknote, IProduct } from "@/utils/types";
import Pocket from "./components/Pocket";
import VendingMachine from "./components/VendingMachine";
import { useEffect, useState } from "react";
import * as action from "@/utils/action";
import Summary from "./components/Summary";

export default function Home() {
  const [coinBanknotes, setCoinBanknotes] = useState<ICoinBanknote[]>([]);
  const [products, setProducts] = useState<IProduct[]>([]);
  const [selectCoinBanknotes, setSelectCoinBanknotes] = useState<
    ICoinBanknote[]
  >([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalPayment, setTotalPayment] = useState(0);

  const [change, setChange] = useState<ICoinBanknote[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const sp = await action.getStockProducts();
      const cb = await action.getCoinBanknotes();

      setCoinBanknotes(cb);
      setProducts(sp);
    };

    fetchData();
  }, []);

  const handleSelectedCoinBanknotes = (coinBanknotes: ICoinBanknote[]) => {
    setSelectCoinBanknotes(coinBanknotes);
  };

  const handleSetTotalPrice = (totalPrice: number) => {
    setTotalPrice(totalPrice);
  };

  const handleSetTotalPayment = (totalPayment: number) => {
    setTotalPayment(totalPayment);
  };

  const handleSelectedProducts = async (products: IProduct[]) => {
    const response: { message: string; change: ICoinBanknote[] } =
      await action.calculateChange(selectCoinBanknotes, products);

    setChange(response.change);
  };

  return (
    <div className="min-h-screen bg-blue-200 flex flex-row p-4 gap-4">
      {/* user pocket */}
      <div className="bg-white basis-1/3">
        <Pocket
          coinBanknotes={coinBanknotes}
          onSelected={handleSelectedCoinBanknotes}
          onTotal={handleSetTotalPayment}
        />
      </div>
      {/* vending machine */}
      <div className="bg-green-200 flex flex-col flex-1">
        <div className="bg-green-200 flex-1">
          <VendingMachine
            products={products}
            onSelected={handleSelectedProducts}
            onTotal={handleSetTotalPrice}
          />
        </div>
        {/* summary */}
        <div className="bg-green-200 flex-1">
          <Summary change={change} totalPayment={totalPayment} totalPrice={totalPrice} />
        </div>
      </div>
    </div>
  );
}
