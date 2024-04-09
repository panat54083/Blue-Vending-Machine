import express, { Request, Response } from "express";
import { ProductController } from "../controllers/product.controller";

const router = express.Router();
const productController = new ProductController();

// GET /products
router.get("/", async (req: Request, res: Response) => {
  await productController.getAllProducts(req, res);
});

// GET /products/:id
router.get("/:id", async (req: Request, res: Response) => {
  await productController.getProductById(req, res);
});

// POST /products
router.post("/", async (req: Request, res: Response) => {
  await productController.createProduct(req, res);
});

// PUT /products/:id
router.put("/:id", async (req: Request, res: Response) => {
  await productController.updateProduct(req, res);
});

// DELETE /products/:id
router.delete("/:id", async (req: Request, res: Response) => {
  await productController.deleteProduct(req, res);
});

export { router as productRouter };
