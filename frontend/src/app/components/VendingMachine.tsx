import React, { useState } from "react";
import { Divider, List, InputNumber, Button } from "antd";
import { IProduct } from "@/utils/constants";

function VendingMachine({ products }: { products: IProduct[] }) {
  const [selectedProducts, setSelectedProducts] = useState<IProduct[]>([]);

  const handleProductSelection = (productName: string, quantity: number) => {
    const product = products.find((p) => p.name === productName);
    if (product) {
      const updatedProducts = selectedProducts.filter(
        (p) => p.name !== productName
      );
      if (quantity > 0) {
        updatedProducts.push({ ...product, stock: quantity }); // Update stock to quantity
      }
      setSelectedProducts(updatedProducts);
    }
  };

  const calculateTotalPrice = () => {
    let totalPrice = 0;
    selectedProducts.forEach((product) => {
      totalPrice += product.price * product.stock;
    });
    return totalPrice;
  };

  const handleBuy = () => {
    console.log(selectedProducts);
    const totalPrice = calculateTotalPrice();
    console.log("Total price:", totalPrice);
  };

  return (
    <div className="w-full h-full bg-gray-100 p-4">
      <Divider orientation="left">Products</Divider>
      <List
        dataSource={products}
        renderItem={(product) => (
          <List.Item>
            <div className="w-full grid grid-cols-3 gap-4">
              <span>
                {product.name}{" "}
                <span className="text-gray-500">({product.price} THB)</span>
              </span>
              <span className="flex items-center justify-center gap-2">
                {product.stock}{" "}
                <span className="text-gray-500">
                  {product.stock ? "in stock" : "out of stocks"}
                </span>
              </span>
              <div className="flex justify-end">
                <InputNumber
                  min={0}
                  max={product.stock}
                  defaultValue={0}
                  onChange={(value) =>
                    handleProductSelection(product.name, value ? value : 0)
                  }
                />
              </div>
            </div>
          </List.Item>
        )}
      />

      <Divider orientation="left" className="mt-4">
        Summary
      </Divider>
      <div>
        {selectedProducts.map((product) => (
          <div key={product.name} className="grid grid-cols-3 gap-4">
            <span className="flex items-center justify-start gap-2">
              {product.name}{" "}
              <span className="text-gray-500">(THB {product.price})</span>
            </span>
            <span className="flex items-center justify-center gap-2">
              <span className="text-gray-500">x</span> {product.stock}
            </span>
            <span className="flex items-center justify-end">
              {product.price * product.stock} THB
            </span>
          </div>
        ))}

        <div className="flex justify-end mt-4">
          Total Price: {calculateTotalPrice()} THB
        </div>

        <div className="flex justify-end mt-4">
          <Button type="primary" onClick={handleBuy}>
            Confirm Purchase
          </Button>
        </div>
      </div>
    </div>
  );
}

export default VendingMachine;
