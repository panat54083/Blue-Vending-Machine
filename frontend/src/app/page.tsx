"use client";

import { ICoinBanknote, IProduct } from "@/utils/types";
import Pocket from "./components/Pocket";
import VendingMachine from "./components/VendingMachine";
import { useEffect, useState } from "react";
import * as action from "@/utils/action";

export default function Home() {
  const [coinBanknotes, setCoinBanknotes] = useState<ICoinBanknote[]>([]);
  const [products, setProducts] = useState<IProduct[]>([]);
  const [selectCoinBanknotes, setSelectCoinBanknotes] = useState<
    ICoinBanknote[]
  >([]);

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

  const handleSelectedProducts = async (products: IProduct[]) => {
    await action.calculateChange(selectCoinBanknotes, products);
  };

  return (
    <div className="min-h-screen bg-blue-200 flex flex-row p-4 gap-4">
      {/* user pocket */}
      <div className="bg-white basis-1/3">
        <Pocket
          coinBanknotes={coinBanknotes}
          onSelected={handleSelectedCoinBanknotes}
        />
      </div>
      {/* vending machine */}
      <div className="bg-green-200 flex-1">
        <VendingMachine
          products={products}
          onSelected={handleSelectedProducts}
        />
      </div>
    </div>
  );
}
