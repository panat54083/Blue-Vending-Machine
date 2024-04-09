import { Request, Response } from "express";
import { Product } from "../entity/Product";
import { CoinBanknote } from "../entity/CoinBanknote";
import { AppDataSource } from "../data-source";

export class VendingMachineController {
  private productRepository = AppDataSource.getRepository(Product);
  private coinBanknoteRepository = AppDataSource.getRepository(CoinBanknote);

  async purchaseProduct(req: Request, res: Response): Promise<void> {
    const {
      coinBanknotes,
      products,
    }: { coinBanknotes: CoinBanknote[]; products: Product[] } = req.body;

    // get total amount paid
    let totalAmountPaid = 0;
    coinBanknotes.map((coinBanknote) => {
      totalAmountPaid += coinBanknote.value * coinBanknote.stock; // coinBanknote.stock is amount of selcted coinBanknote to be purchased
    });

    // get total price
    let totalPrice = 0;
    products.map((product) => {
      totalPrice += product.price * product.stock; // product.stock is amount of selcted product to be purchased
    });

    // check if sufficient amount paid
    if (totalAmountPaid < totalPrice) {
      res.status(400).json({ message: "Insufficient amount paid" });
      return;
    }

    // calculate change
    let changeAmount = totalAmountPaid - totalPrice;

    // create a new query runner
    const queryRunner = AppDataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      // 1. update product stock in database
      await Promise.all(
        products.map(async (product) => {
          const existingProduct = await this.productRepository.findOneBy({
            id: product.id,
          });

          if (!existingProduct) {
            res
              .status(404)
              .json({ message: `Product with ID ${product.id} not found` });
            return;
          }

          if (existingProduct.stock <= 0) {
            res.status(400).json({
              message: `Product "${existingProduct.name}" is out of stock`,
            });
            return;
          }

          // product.stock is selcted product to be purchased
          existingProduct.stock = existingProduct.stock - product.stock;

          await queryRunner.manager.save(existingProduct);
        })
      );

      // 2. return change
      const availableCoinBanknotes = await this.coinBanknoteRepository.find();

      let changeToReturn: CoinBanknote[] = [];

      // Sort available coin/banknote value in descending order
      availableCoinBanknotes.sort((a, b) => b.value - a.value);

      await Promise.all(
        availableCoinBanknotes.map(async (coinBanknote) => {
          // Calculate number of coins/banknotes to return
          const numberOfCoinsBanknotesToReturn = Math.min(
            Math.floor(changeAmount / coinBanknote.value),
            coinBanknote.stock
          );

          // Update changeToReturn
          if (numberOfCoinsBanknotesToReturn > 0) {
            changeToReturn.push({
              ...coinBanknote,
              stock: numberOfCoinsBanknotesToReturn,
            });
            changeAmount -= coinBanknote.value * numberOfCoinsBanknotesToReturn;

            // Update coin/banknote stock
            coinBanknote.stock -= numberOfCoinsBanknotesToReturn;

            await queryRunner.manager.save(coinBanknote);
          }
        })
      );

      if (changeAmount < 0) {
        res.status(400).json({
          message: "Insufficient change to return",
          change: changeToReturn,
        });
      }

      if (changeAmount > 0) {
        res.status(400).json({
          message: "Insufficient change to return",
          change: changeToReturn,
        });
      }

      // 3. update coin banknotes in database
      await Promise.all(
        coinBanknotes.map(async (coinBanknote) => {
          const existingCoinBanknote =
            await this.coinBanknoteRepository.findOneBy({
              id: coinBanknote.id,
            });

          if (!existingCoinBanknote) {
            res
              .status(404)
              .json({ message: `Coin with ID ${coinBanknote.id} not found` });
            return;
          }

          // add coin banknote which user payed to database
          existingCoinBanknote.stock =
            existingCoinBanknote.stock + coinBanknote.stock;

          await queryRunner.manager.save(existingCoinBanknote);
        })
      );
      await queryRunner.commitTransaction();
      res.status(200).json({
        message: "Transaction successful",
        change: changeToReturn,
      });
    } catch (error) {
      console.error(error);
      await queryRunner.rollbackTransaction();

      res.status(500).json({ message: "Failed to process transaction" });
    } finally {
      await queryRunner.release();
    }
  }
}
