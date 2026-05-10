import Product from "../models/productModel.js";
import Category from "../models/categoryModel.js";
import User from "../models/userModel.js";

async function createProduct(req, res) {
  try {
    const { name, price, discountPrice, description, stock, category } = req.body;
    let image = req.body.image;

    if (req.file) {
      image = `/uploads/${req.file.filename}`;
    }

    const product = await Product.create({
      name,
      price,
      discountPrice,
      description,
      stock,
      image,
      categoryId: category,
      userId: req.user.id
    });
    res.status(201).json({ message: "Product created successfully", product });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function getProducts(req, res) {
  try {
    const products = await Product.findAll({
      include: [
        { model: Category, attributes: ["name"] },
        { model: User, attributes: ["name"] }
      ]
    });
    res.json({ message: "Products fetched successfully", products });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function getProductByID(req, res) {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id, {
      include: [
        { model: Category, attributes: ["name"] },
        { model: User, attributes: ["name"] }
      ]
    });
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json({ message: "Product fetched successfully", product });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function updateProduct(req, res) {
  try {
    const { id } = req.params;
    let updateData = { ...req.body };

    if (req.file) {
      updateData.image = `/uploads/${req.file.filename}`;
    }

    // Handle Mongoose 'category' field mapping to Sequelize 'categoryId' if present
    if (updateData.category) {
      updateData.categoryId = updateData.category;
      delete updateData.category;
    }

    const [updatedRows] = await Product.update(updateData, { where: { id } });
    if (updatedRows === 0) return res.status(404).json({ message: "Product not found or no changes made" });

    const product = await Product.findByPk(id);
    res.json({ message: "Product updated successfully", product });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function deleteProduct(req, res) {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    await Product.destroy({ where: { id } });
    res.json({ message: "Product deleted successfully", product });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export { createProduct, getProducts, getProductByID, updateProduct, deleteProduct };
