"use client";

import { ICoinBanknote, IProduct } from "@/utils/types";
import Pocket from "./components/Pocket";
import VendingMachine from "./components/VendingMachine";
import { useEffect, useState } from "react";
import * as action from "@/utils/action";
import Summary from "./components/Summary";
import { message } from "antd";
import { AxiosError } from "axios";

export default function Home() {
  const [messageApi, contextHolder] = message.useMessage();
  const [coinBanknotes, setCoinBanknotes] = useState<ICoinBanknote[]>([]);
  const [products, setProducts] = useState<IProduct[]>([]);
  const [selectCoinBanknotes, setSelectCoinBanknotes] = useState<
    ICoinBanknote[]
  >([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalPayment, setTotalPayment] = useState(0);

  const [change, setChange] = useState<ICoinBanknote[]>([]);

  const [coinBanknotesInStock, setCoinBanknotesInStock] = useState<
    ICoinBanknote[]
  >([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const sp = await action.getStockProducts();
        const cb = await action.getCoinBanknotes().then((data) => {
          return data.map((cb) => ({ ...cb, stock: 1000000 })); // set pocket to 1,000,000
        });
        const cbs = await action.getAllCoinBanknotes();

        setCoinBanknotes(cb);
        setProducts(sp);
        setCoinBanknotesInStock(cbs);
      } catch (error) {
        const m = (error as AxiosError).message;
        messageApi.error(m);
      }
    };

    fetchData();
  }, [change]);

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
    try {
      const response: { message: string; change: ICoinBanknote[] } =
        await action.calculateChange(selectCoinBanknotes, products);

      setChange(response.change);
    } catch (error: any) {
      const m = error.response?.data.message || error.message;
      messageApi.error(m);
    }
  };

  return (
    <div className="min-h-screen bg-blue-200 flex flex-row p-4 gap-4">
      {contextHolder}

      {/* user pocket */}
      <div className="bg-white basis-1/3">
        <Pocket
          coinBanknotes={coinBanknotes}
          onSelected={handleSelectedCoinBanknotes}
          onTotal={handleSetTotalPayment}
        />
      </div>
      {/* vending machine */}
      <div className="flex flex-col flex-1">
        <div className="bg-white flex-1">
          <VendingMachine
            products={products}
            onSelected={handleSelectedProducts}
            onTotal={handleSetTotalPrice}
          />
        </div>
        {/* summary */}
        <div className="bg-blue-100 flex-1">
          <Summary
            change={change}
            totalPayment={totalPayment}
            totalPrice={totalPrice}
            coinBanknotesInStock={coinBanknotesInStock}
          />
        </div>
      </div>
    </div>
  );
}
