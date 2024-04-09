import { MigrationInterface, QueryRunner } from "typeorm";
import { Product } from "../entity/Product";
import { CoinBanknote } from "../entity/CoinBanknote";

export class Seed1712629286946 implements MigrationInterface {
  name = "Seed1712629286946";

  public async up(queryRunner: QueryRunner): Promise<void> {
    // Define an array of products to seed
    const productsToSeed: Partial<Product>[] = [
      { name: "Chips", price: 20, stock: 100 },
      { name: "Soda", price: 30, stock: 80 },
      { name: "Chocolate Bar", price: 15, stock: 120 },
      { name: "Candy", price: 10, stock: 150 },
      // Add more products as needed
    ];

    // Define an array of coin/banknote denominations to seed
    const coinBanknotesToSeed: Partial<CoinBanknote>[] = [
      { name: "1 THB Coin", value: 1, type: "COIN", stock: 1000 },
      { name: "5 THB Coin", value: 5, type: "COIN", stock: 500 },
      { name: "10 THB Coin", value: 10, type: "COIN", stock: 1000 },
      { name: "20 THB Banknote", value: 20, type: "BANKNOTE", stock: 200 },
      { name: "50 THB Banknote", value: 50, type: "BANKNOTE", stock: 200 },
      { name: "100 THB Banknote", value: 100, type: "BANKNOTE", stock: 100 },
      { name: "500 THB Banknote", value: 500, type: "BANKNOTE", stock: 50 },
      { name: "1000 THB Banknote", value: 1000, type: "BANKNOTE", stock: 20 },
    ];

    // Insert products into the database
    await Promise.all(
      productsToSeed.map(async (productData) => {
        try {
          await queryRunner.manager.insert(Product, productData);
        } catch (error: any) {
          console.error(`Error seeding product: ${error.message}`);
        }
      })
    );

    // Insert coin/banknote denominations into the database
    await Promise.all(
      coinBanknotesToSeed.map(async (coinBanknoteData) => {
        try {
          await queryRunner.manager.insert(CoinBanknote, coinBanknoteData);
        } catch (error: any) {
          console.error(`Error seeding coin/banknote: ${error.message}`);
        }
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Since this is a seed migration, down function should be implemented if you want to remove seeded data
    // For simplicity, you can leave it empty or implement it to remove seeded data if needed
  }
}
