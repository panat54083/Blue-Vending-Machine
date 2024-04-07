import React from "react";
import { Divider } from "antd";
import { ICurrency } from "@/utils/constants";

function Pocket({
  backnotes,
  coins,
}: {
  backnotes: ICurrency[];
  coins: ICurrency[];
}) {
  return (
    <div className="w-full h-full bg-red-200">
      <Divider orientation="left">Backnotes</Divider>

      <div>
        {backnotes.map((backnote) => {
          return <p key={backnote.name}>{backnote.name}</p>;
        })}
      </div>

      <Divider orientation="left">Coins</Divider>
      <div>
        <p>Coins</p>
      </div>
    </div>
  );
}

export default Pocket;
