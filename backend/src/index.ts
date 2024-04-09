import express from "express";
import { AppDataSource } from "./data-source";
import { productRouter } from "./routes/product.routes";
import { coinBanknoteRouter } from "./routes/coinBanknote.routes";
import { vendingMachineRouter } from "./routes/vending-machine.routes";

AppDataSource.initialize().then(() => {
  const app = express();
  const cors = require("cors");
  app.use(express.json());
  app.use(cors());

  app.use("/products", productRouter);
  app.use("/coin-banknotes", coinBanknoteRouter);
  app.use("/vending-machine", vendingMachineRouter);

  return app.listen(process.env.PORT);
});
