import express from "express";
import { AppDataSource } from "./data-source";
import { productRouter } from "./routes/product.routes";
import { coinBanknoteRouter } from "./routes/coinBanknote.routes";

AppDataSource.initialize().then(() => {
  const app = express();
  const cors = require("cors");
  app.use(express.json());
  app.use(cors());

  app.use("/products", productRouter);
  app.use("/coin-banknotes", coinBanknoteRouter);

  return app.listen(process.env.PORT);
});
