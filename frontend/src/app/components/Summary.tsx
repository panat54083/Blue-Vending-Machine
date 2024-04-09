import React from "react";
import { ICoinBanknote } from "@/utils/types";
import { Card, Typography } from "antd";

const { Title } = Typography;

interface SummaryProps {
  totalPrice: number;
  totalPayment: number;
  change: ICoinBanknote[];
  coinBanknotesInStock: ICoinBanknote[];
}

const Summary: React.FC<SummaryProps> = ({
  totalPrice,
  totalPayment,
  change,
  coinBanknotesInStock,
}) => {
  return (
    <div className="w-full h-full p-4 flex justify-center items-center">
      <Card title="Summary" className="w-1/2 flex flex-col">
        <div>
          <Title level={5}>Total Price:</Title>
          <p>{totalPrice} THB</p>
        </div>
        <div>
          <Title level={5}>Total Payment:</Title>
          <p>{totalPayment} THB</p>
        </div>
        <div className="flex flex-1">
          <div className="flex-1">
            <Title level={5}>Change:</Title>
            {change.map((item) => (
              <p key={item.id}>
                {item.name}: {item.stock}
              </p>
            ))}
          </div>
          <div className="flex-1">
            <Title level={5}>Coin & Banknotes In stock:</Title>
            {coinBanknotesInStock.map((item) => (
              <p key={item.id}>
                {item.name}: {item.stock}
              </p>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Summary;
