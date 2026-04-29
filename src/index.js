import express from "express";
import connectDatabase from "./config/database.js";

const app = express();
const port = 4000;

function getProducts(request, response) {
  response.json({
    name: "Bags",
    price: 100,
  });
}

function getUsers(request, response) {
  response.send("hello users");
}
app.get("/products", getProducts);
app.get("/users", getUsers);

connectDatabase();

app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`);
});
