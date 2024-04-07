import React, { useEffect, useState } from "react";
import { Divider, List, InputNumber } from "antd";
import { ICurrency } from "@/utils/constants";

interface IOnSelectedCurrency {
  banknotes: ICurrency[];
  coins: ICurrency[];
}

function Pocket({
  backnotes,
  coins,
  onSelected,
}: {
  backnotes: ICurrency[];
  coins: ICurrency[];
  onSelected: (data: IOnSelectedCurrency) => void;
}) {
  const [selectedBacknotes, setSelectedBacknotes] = useState<ICurrency[]>([]);
  const [selectedCoins, setSelectedCoins] = useState<ICurrency[]>([]);

  const handleBacknoteSelection = (name: string, quantity: number) => {
    const backnote = backnotes.find((b) => b.name === name);
    if (backnote) {
      const updatedBacknotes = selectedBacknotes.filter(
        (b) => b.name !== name
      );
      if (quantity > 0) {
        updatedBacknotes.push({ ...backnote, quantity });
      }
      setSelectedBacknotes(updatedBacknotes);
    }
  };

  const handleCoinSelection = (name: string, quantity: number) => {
    const coin = coins.find((c) => c.name === name);
    if (coin) {
      const updatedCoins = selectedCoins.filter((c) => c.name !== name);
      if (quantity > 0) {
        updatedCoins.push({ ...coin, quantity });
      }
      setSelectedCoins(updatedCoins);
    }
  };

  const calculateTotalValue = () => {
    let totalValue = 0;
    selectedBacknotes.forEach((backnote) => {
      totalValue += backnote.value * backnote.quantity;
    });
    selectedCoins.forEach((coin) => {
      totalValue += coin.value * coin.quantity;
    });

    return totalValue;
  };

  const totalValue = calculateTotalValue();

  useEffect(() => {
    const selectedCurrencies: IOnSelectedCurrency = {
      coins: selectedCoins,
      banknotes: selectedBacknotes,
    };

    if (onSelected) {
      onSelected(selectedCurrencies);
    }
  }, [onSelected, selectedBacknotes, selectedCoins, totalValue]);

  return (
    <div className="w-full h-full bg-red-200 p-4">
      <Divider orientation="left">Backnotes</Divider>
      <List
        dataSource={backnotes}
        renderItem={(backnote) => (
          <List.Item>
            <span>
              {backnote.name} ({backnote.value} THB)
            </span>
            <InputNumber
              min={0}
              max={backnote.quantity}
              defaultValue={0}
              onChange={(value) =>
                handleBacknoteSelection(backnote.name, value ? value : 0)
              }
            />
          </List.Item>
        )}
      />

      <Divider orientation="left">Coins</Divider>
      <List
        dataSource={coins}
        renderItem={(coin) => (
          <List.Item>
            <span>
              {coin.name} ({coin.value} THB)
            </span>
            <InputNumber
              min={0}
              max={coin.quantity}
              defaultValue={0}
              onChange={(value) =>
                handleCoinSelection(coin.name, value ? value : 0)
              }
            />
          </List.Item>
        )}
      />

      <Divider orientation="left">Result</Divider>
      <div className="flex justify-end m-4">
        <div>Total Value: {totalValue} THB</div>
      </div>
    </div>
  );
}

export default Pocket;
