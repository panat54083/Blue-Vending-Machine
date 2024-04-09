import { Request, Response } from "express";
import { CoinBanknote } from "../entity/CoinBanknote";
import { AppDataSource } from "../data-source";

export class CoinBanknoteController {
  private coinBanknoteRepository = AppDataSource.getRepository(CoinBanknote);

  async getAllCoinBanknotes(req: Request, res: Response): Promise<void> {
    try {
      const coinBanknotes = await this.coinBanknoteRepository.find();
      res.json(coinBanknotes);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Failed to fetch coin and banknote denominations" });
    }
  }

  async getCoinBanknoteById(req: Request, res: Response): Promise<void> {
    const coinBanknoteId = parseInt(req.params.id);

    try {
      const coinBanknote = await this.coinBanknoteRepository.findOneBy({
        id: coinBanknoteId,
      });
      if (coinBanknote) {
        res.json(coinBanknote);
      } else {
        res
          .status(404)
          .json({ message: "Coin or banknote denomination not found" });
      }
    } catch (error) {
      res
        .status(500)
        .json({ message: "Failed to fetch coin or banknote denomination" });
    }
  }

  async createCoinBanknote(req: Request, res: Response): Promise<void> {
    const { name, value, type, stock } = req.body;

    try {
      const coinBanknote = this.coinBanknoteRepository.create({
        name,
        value,
        type,
        stock,
      });
      await this.coinBanknoteRepository.save(coinBanknote);
      res.status(201).json(coinBanknote);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Failed to create coin or banknote denomination" });
    }
  }

  async updateCoinBanknote(req: Request, res: Response): Promise<void> {
    const coinBanknoteId = parseInt(req.params.id);
    const { name, value, type, stock } = req.body;

    try {
      const coinBanknote = await this.coinBanknoteRepository.findOneBy({
        id: coinBanknoteId,
      });
      if (coinBanknote) {
        coinBanknote.name = name;
        coinBanknote.value = value;
        coinBanknote.type = type;
        coinBanknote.stock = stock;
        await this.coinBanknoteRepository.save(coinBanknote);
        res.json(coinBanknote);
      } else {
        res
          .status(404)
          .json({ message: "Coin or banknote denomination not found" });
      }
    } catch (error) {
      res
        .status(500)
        .json({ message: "Failed to update coin or banknote denomination" });
    }
  }

  async deleteCoinBanknote(req: Request, res: Response): Promise<void> {
    const coinBanknoteId = parseInt(req.params.id);

    try {
      const coinBanknote = await this.coinBanknoteRepository.findOneBy({
        id: coinBanknoteId,
      });
      if (coinBanknote) {
        await this.coinBanknoteRepository.remove(coinBanknote);
        res.json({
          message: "Coin or banknote denomination deleted successfully",
        });
      } else {
        res
          .status(404)
          .json({ message: "Coin or banknote denomination not found" });
      }
    } catch (error) {
      res
        .status(500)
        .json({ message: "Failed to delete coin or banknote denomination" });
    }
  }
}
