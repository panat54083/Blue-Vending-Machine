import React, { useEffect, useState } from "react";
import { Divider, List, InputNumber } from "antd";
import { ICoinBanknote } from "@/utils/types";

function Pocket({
  coinBanknotes,
  onSelected,
}: {
  coinBanknotes: ICoinBanknote[];
  onSelected: (data: ICoinBanknote[]) => void;
}) {
  const [coins, setCoins] = useState<ICoinBanknote[]>([]);
  const [backnotes, setBacknotes] = useState<ICoinBanknote[]>([]);

  const [selectedCoinBanknotes, setSelectCoinBanknotes] = useState<
    ICoinBanknote[]
  >([]);

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

  const handleSelectCoinBanknotes = (id: number, stock: number) => {
    const cb = coinBanknotes.find((cb) => cb.id === id);
    if (cb) {
      const updatedCb = selectedCoinBanknotes.filter((cb) => cb.id !== id);
      if (stock > 0) {
        updatedCb.push({ ...cb, stock });
      }
      setSelectCoinBanknotes(updatedCb);
    }
  };

  const calculateTotalValue = () => {
    let totalValue = 0;
    selectedCoinBanknotes.forEach((cb) => {
      totalValue += cb.value * cb.stock;
    });

    return totalValue;
  };

  useEffect(() => {
    onSelected(selectedCoinBanknotes);
  }, [onSelected, selectedCoinBanknotes]);

  const totalValue = calculateTotalValue();

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
                handleSelectCoinBanknotes(backnote.id, value ? value : 0)
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
                handleSelectCoinBanknotes(coin.id, value ? value : 0)
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
