import { Request, Response } from "express";
import { Product } from "../entity/Product";
import { AppDataSource } from "../data-source";

export class ProductController {
  private productRepository = AppDataSource.getRepository(Product);

  async getAllProducts(req: Request, res: Response): Promise<void> {
    try {
      const products = await this.productRepository.find();
      res.json(products);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch products" });
    }
  }

  async getProductById(req: Request, res: Response): Promise<void> {
    const productId = parseInt(req.params.id);

    try {
      const product = await this.productRepository.findOneBy({ id: productId });
      if (product) {
        res.json(product);
      } else {
        res.status(404).json({ message: "Product not found" });
      }
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch product" });
    }
  }

  async createProduct(req: Request, res: Response): Promise<void> {
    const { name, price, stock } = req.body;

    try {
      const product = this.productRepository.create({ name, price, stock });
      await this.productRepository.save(product);
      res.status(201).json(product);
    } catch (error) {
      res.status(500).json({ message: "Failed to create product" });
    }
  }

  async updateProduct(req: Request, res: Response): Promise<void> {
    const productId = parseInt(req.params.id);
    const { name, price, stock } = req.body;

    try {
      const product = await this.productRepository.findOneBy({ id: productId });
      if (product) {
        product.name = name;
        product.price = price;
        product.stock = stock;
        await this.productRepository.save(product);
        res.json(product);
      } else {
        res.status(404).json({ message: "Product not found" });
      }
    } catch (error) {
      res.status(500).json({ message: "Failed to update product" });
    }
  }

  async deleteProduct(req: Request, res: Response): Promise<void> {
    const productId = parseInt(req.params.id);

    try {
      const product = await this.productRepository.findOneBy({ id: productId });
      if (product) {
        await this.productRepository.remove(product);
        res.json({ message: "Product deleted successfully" });
      } else {
        res.status(404).json({ message: "Product not found" });
      }
    } catch (error) {
      res.status(500).json({ message: "Failed to delete product" });
    }
  }
}
