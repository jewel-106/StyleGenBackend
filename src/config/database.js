import mongoose from "mongoose";

const connectDatabase = () => {
  try {
    mongoose.connect("mongodb://127.0.0.1:27017/ecom");
    console.log("MongoDB Connected");
  } catch (error) {
    console.log(error);
  }
};

export default connectDatabase;
