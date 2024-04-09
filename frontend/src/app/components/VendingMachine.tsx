import React, { useEffect, useState } from "react";
import { Divider, List, Button } from "antd";
import { IProduct } from "@/utils/types";

function VendingMachine({
  products,
  onSelected,
  onTotal,
}: {
  products: IProduct[];
  onSelected: (data: IProduct[]) => void;
  onTotal: (data: number) => void;
}) {
  const [selectedProducts, setSelectedProducts] = useState<IProduct[]>([]);

  const handleProductSelection = (productName: string, quantity: number) => {
    const product = products.find((p) => p.name === productName);
    if (product && quantity > 0) {
      // If a product is already selected, deselect it
      if (selectedProducts.length > 0) {
        setSelectedProducts([]);
      }
      setSelectedProducts([{ ...product, stock: quantity }]);
    } else {
      setSelectedProducts([]); // Deselect if quantity is 0 or no product found
    }
  };

  const calculateTotalPrice = () => {
    let totalPrice = 0;
    selectedProducts.forEach((product) => {
      totalPrice += product.price * product.stock;
    });
    onTotal(totalPrice);
    return totalPrice;
  };

  const handlConfirmPurchase = () => {
    onSelected(selectedProducts);
  };

  return (
    <div className="w-full h-full p-4">
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
                <Button
                  type={
                    selectedProducts.length > 0 &&
                    selectedProducts[0].name === product.name
                      ? "primary"
                      : "default"
                  }
                  onClick={() => handleProductSelection(product.name, 1)}
                >
                  Select
                </Button>
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
          <Button
            type="primary"
            onClick={handlConfirmPurchase}
            disabled={selectedProducts.length === 0}
          >
            Confirm Purchase
          </Button>
        </div>
      </div>
    </div>
  );
}

export default VendingMachine;
