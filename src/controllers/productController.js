import Product from "../models/productModel.js";

async function createProduct(req, res) {
  const { name, price, discountPrice, description, stock, image } = req.body;
  const product = await Product.create({
    name,
    price,
    discountPrice,
    description,
    stock,
    image,
  });
  res.json({
    message: "Product created successfully",
    product,
  });
}
async function getProducts(req, res) {
  const products = await Product.find();
  res.json({
    message: "Products fetched successfully",
    products,
  });
}

async function getProductByID(req, res) {
  const { id } = req.params;
  const product = await Product.findOne({ _id: id });
  res.json({
    message: "Product fetched successfully",
    product,
  });
}

export { createProduct, getProducts, getProductByID };
