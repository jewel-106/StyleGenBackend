import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  discountPrice: Number,
  description: String,
  stock: Number,
  image: String,
});
const Product = mongoose.model("product", productSchema);

export default Product;
