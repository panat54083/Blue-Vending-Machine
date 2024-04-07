"use client";

import { BANKNOTES, COINS } from "@/utils/constants";
import Pocket from "./components/Pocket";

export default function Home() {
  return (
    <div className="min-h-screen bg-blue-200 flex flex-row p-4 gap-4">
      {/* user pocket */}
      <div className="bg-white basis-1/3">
        <Pocket backnotes={BANKNOTES} coins={COINS} />
      </div>
      {/* vending machine */}
      <div className="bg-green-200 flex-1"></div>
    </div>
  );
}
