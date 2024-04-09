import React, { useEffect, useState } from "react";
import { Divider, List, InputNumber } from "antd";
import { ICoinBanknote } from "@/utils/types";

interface IOnSelectedCurrency {
  banknotes: ICoinBanknote[];
  coins: ICoinBanknote[];
}

function Pocket({
  coinBanknotes,
  onSelected,
}: {
  coinBanknotes: ICoinBanknote[];
  onSelected: (data: IOnSelectedCurrency) => void;
}) {
  const [coins, setCoins] = useState<ICoinBanknote[]>([]);
  const [backnotes, setBacknotes] = useState<ICoinBanknote[]>([]);

  const [selectedBacknotes, setSelectedBacknotes] = useState<ICoinBanknote[]>(
    []
  );
  const [selectedCoins, setSelectedCoins] = useState<ICoinBanknote[]>([]);

  useEffect(() => {
    const c: ICoinBanknote[] = [];
    const b: ICoinBanknote[] = [];
    coinBanknotes.map((cb) => {
      if (cb.type === "COIN") {
        c.push(cb);
      } else if (cb.type === "BANKNOTE") {
        b.push(cb);
      }
    });

    setCoins(c);
    setBacknotes(b);
  }, [coinBanknotes]);

  const handleBacknoteSelection = (name: string, stock: number) => {
    const backnote = backnotes.find((b) => b.name === name);
    if (backnote) {
      const updatedBacknotes = selectedBacknotes.filter((b) => b.name !== name);
      if (stock > 0) {
        updatedBacknotes.push({ ...backnote, stock });
      }
      setSelectedBacknotes(updatedBacknotes);
    }
  };

  const handleCoinSelection = (name: string, stock: number) => {
    const coin = coins.find((c) => c.name === name);
    if (coin) {
      const updatedCoins = selectedCoins.filter((c) => c.name !== name);
      if (stock > 0) {
        updatedCoins.push({ ...coin, stock });
      }
      setSelectedCoins(updatedCoins);
    }
  };

  const calculateTotalValue = () => {
    let totalValue = 0;
    selectedBacknotes.forEach((backnote) => {
      totalValue += backnote.value * backnote.stock;
    });
    selectedCoins.forEach((coin) => {
      totalValue += coin.value * coin.stock;
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
            <span>{backnote.name}</span>
            <InputNumber
              min={0}
              max={backnote.stock}
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
            <span>{coin.name}</span>
            <InputNumber
              min={0}
              max={coin.stock}
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
