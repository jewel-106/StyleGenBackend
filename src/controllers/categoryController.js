import Category from "../models/categoryModel.js";

async function createCategory(req, res) {
  const { name, description } = req.body;
  const category = await Category.create({
    name,
    description,
  });
  res.json({
    message: "Category created successfully",
    category,
  });
}

async function getCategories(req, res) {
  const categories = await Category.find();
  res.json({
    message: "Categories fetched successfully",
    categories,
  });
}

async function deleteCategory(req, res) {
  const { id } = req.params;
  const category = await Category.findOneAndDelete({ _id: id });
  res.json({
    message: "Category deleted successfully",
    category,
  });
}

export { createCategory, getCategories, deleteCategory };
