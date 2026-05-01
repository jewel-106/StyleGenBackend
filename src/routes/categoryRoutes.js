import express from "express";
import {
  createCategory,
  getCategories,
  deleteCategory,
} from "../controllers/categoryController.js";

const categoryRoutes = express.Router();

categoryRoutes.post("/", createCategory);
categoryRoutes.get("/", getCategories);
categoryRoutes.delete("/:id", deleteCategory);

export default categoryRoutes;
  