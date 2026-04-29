import express from "express";
import connectDatabase from "./config/database.js";
import User from "./models/userModel.js";
import Product from "./models/productModel.js";

const app = express();
const port = 4000;
app.use(express.json());

async function register(req, res) {
  const { name, email, password } = req.body;
  const user = await User.create({
    name,
    email,
    password,
  });
  res.json({
    message: "User registered successfully",
    user,
  });
}
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

app.post("/register", register);
app.post("/products", createProduct);
app.get("/products", getProducts);

connectDatabase();

app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`);
});
