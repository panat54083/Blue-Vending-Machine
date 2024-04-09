import { MigrationInterface, QueryRunner } from "typeorm";
import { Product } from "../entity/Product";
import { CoinBanknote } from "../entity/CoinBanknote";

export class Seed1712627020197 implements MigrationInterface {
  name = "Seed1712627020197";

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
      { denomination: 1, stock: 1000 },
      { denomination: 5, stock: 500 },
      { denomination: 10, stock: 1000 },
      { denomination: 20, stock: 200 },
      { denomination: 50, stock: 200 },
      { denomination: 100, stock: 100 },
      { denomination: 500, stock: 50 },
      { denomination: 1000, stock: 20 },
      // Add more coin/banknote denominations as needed
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
