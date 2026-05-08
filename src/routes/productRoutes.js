import express from "express";
import { createProduct, getProducts, getProductByID, updateProduct, deleteProduct } from "../controllers/productController.js";
import { protect, adminOnly } from "../middlewares/authMiddleware.js";
import upload from "../middlewares/uploadMiddleware.js";

const router = express.Router();

router.get("/", getProducts);
router.get("/:id", getProductByID);
router.post("/", protect, adminOnly, upload.single('image'), createProduct);
router.put("/:id", protect, adminOnly, upload.single('image'), updateProduct);
router.delete("/:id", protect, adminOnly, deleteProduct);

export default router;
