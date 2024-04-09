import React from "react";
import { ICoinBanknote } from "@/utils/types";
import { Card, Typography } from "antd";

const { Title } = Typography;

interface SummaryProps {
  totalPrice: number;
  totalPayment: number;
  change: ICoinBanknote[];
}

const Summary: React.FC<SummaryProps> = ({
  totalPrice,
  totalPayment,
  change,
}) => {
  return (
    <div className="w-full h-full bg-yellow-200 p-4 flex justify-center items-center">
      <Card title="Summary" className="w-1/2 ">
        <div>
          <Title level={5}>Total Price:</Title>
          <p>{totalPrice} THB</p>
        </div>
        <div>
          <Title level={5}>Total Payment:</Title>
          <p>{totalPayment} THB</p>
        </div>
        <div>
          <Title level={5}>Change:</Title>
          {change.map((item) => (
            <p key={item.id}>
              {item.name}: {item.stock}
            </p>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default Summary;
