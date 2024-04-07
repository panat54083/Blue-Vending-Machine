"use client";

import { Button } from "antd";
import * as action from "@/utils/action";
import axios from "axios";

export default function Home() {
  const handleGetHelloWorld = async () => {
    await action.getStockProducts();
  };

  return (
    <div className="App">
      <Button type="primary" onClick={handleGetHelloWorld}>
        Button
      </Button>
    </div>
  );
}
