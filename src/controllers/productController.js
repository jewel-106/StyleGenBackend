import Product from "../models/productModel.js";

async function createProduct(req, res) {
  try {
    const { name, price, discountPrice, description, stock, image, category } = req.body;
    const product = await Product.create({ 
        name, 
        price, 
        discountPrice, 
        description, 
        stock, 
        image, 
        category,
        user: req.user.id 
    });
    res.status(201).json({ message: "Product created successfully", product });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function getProducts(req, res) {
  try {
    const products = await Product.find().populate("category", "name").populate("user", "name");
    res.json({ message: "Products fetched successfully", products });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function getProductByID(req, res) {
  try {
    const { id } = req.params;
    const product = await Product.findById(id).populate("category", "name").populate("user", "name");
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json({ message: "Product fetched successfully", product });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function updateProduct(req, res) {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body, { new: true });
    res.json({ message: "Product updated successfully", product });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function deleteProduct(req, res) {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);
    res.json({ message: "Product deleted successfully", product });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export { createProduct, getProducts, getProductByID, updateProduct, deleteProduct };
