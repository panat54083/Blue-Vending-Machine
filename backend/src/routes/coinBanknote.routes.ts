import express, { Request, Response } from "express";
import { CoinBanknoteController } from "../controllers/backnote.controller";

const router = express.Router();
const coinBanknoteController = new CoinBanknoteController();

// GET /coin-banknotes
router.get("/", async (req: Request, res: Response) => {
  await coinBanknoteController.getAllCoinBanknotes(req, res);
});

// GET /coin-banknotes/:id
router.get("/:id", async (req: Request, res: Response) => {
  await coinBanknoteController.getCoinBanknoteById(req, res);
});

// POST /coin-banknotes
router.post("/", async (req: Request, res: Response) => {
  await coinBanknoteController.createCoinBanknote(req, res);
});

// PUT /coin-banknotes/:id
router.put("/:id", async (req: Request, res: Response) => {
  await coinBanknoteController.updateCoinBanknote(req, res);
});

// DELETE /coin-banknotes/:id
router.delete("/:id", async (req: Request, res: Response) => {
  await coinBanknoteController.deleteCoinBanknote(req, res);
});

export { router as coinBanknoteRouter };
