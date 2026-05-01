import express from "express";
import {
  createProduct,
  getProducts,
  getProductByID,
} from "../controllers/productController.js";
import { get } from "mongoose";

const productRoutes = express.Router();

productRoutes.get("/", getProducts);
productRoutes.post("/", createProduct);
productRoutes.get("/:id", getProductByID);

export default productRoutes;
