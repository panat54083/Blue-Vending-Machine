import express, { Request, Response } from "express";
import { VendingMachineController } from "../controllers/vending-machine.controller";

const router = express.Router();
const vendingMachineController = new VendingMachineController();

// POST /vending-machine/purchase-product
router.post("/purchase-product", async (req: Request, res: Response) => {
  await vendingMachineController.purchaseProduct(req, res);
});

export { router as vendingMachineRouter };
