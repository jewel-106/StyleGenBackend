import Category from "../models/categoryModel.js";

async function createCategory(req, res) {
  try {
    const { name, description } = req.body;
    const category = await Category.create({
      name,
      description,
      userId: req.user.id,
    });
    res
      .status(201)
      .json({ message: "Category created successfully", category });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function getCategories(req, res) {
  try {
    const categories = await Category.findAll();
    res.json({ message: "Categories fetched successfully", categories });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function updateCategory(req, res) {
  try {
    const { id } = req.params;
    const { name, description } = req.body;

    await Category.update(
      { name, description },
      { where: { id } }
    );

    const category = await Category.findByPk(id);
    res.json({ message: "Category updated successfully", category });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function deleteCategory(req, res) {
  try {
    const { id } = req.params;
    const category = await Category.findByPk(id);
    if (!category) return res.status(404).json({ message: "Category not found" });

    await Category.destroy({ where: { id } });
    res.json({ message: "Category deleted successfully", category });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export { createCategory, getCategories, updateCategory, deleteCategory };
