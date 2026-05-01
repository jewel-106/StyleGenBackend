import express from "express";
import connectDatabase from "./config/database.js";
import User from "./models/userModel.js";
import Product from "./models/productModel.js";
import productRoutes from "./routes/productRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";

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

app.post("/register", register);
app.use("/products", productRoutes);
app.use("/category", categoryRoutes);

connectDatabase();

app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`);
});
