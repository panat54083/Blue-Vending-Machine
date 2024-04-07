"use client";

import { BANKNOTES, COINS, PRODUCTS } from "@/utils/constants";
import Pocket from "./components/Pocket";
import VendingMachine from "./components/VendingMachine";

export default function Home() {
  return (
    <div className="min-h-screen bg-blue-200 flex flex-row p-4 gap-4">
      {/* user pocket */}
      <div className="bg-white basis-1/3">
        <Pocket
          backnotes={BANKNOTES}
          coins={COINS}
          onSelected={(data) => console.log(data)}
        />
      </div>
      {/* vending machine */}
      <div className="bg-green-200 flex-1">
        <VendingMachine products={PRODUCTS}/>
      </div>
    </div>
  );
}
