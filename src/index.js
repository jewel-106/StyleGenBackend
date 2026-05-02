import app from "./app.js";
import connectDatabase from "./config/database.js";

const port = process.env.PORT || 4000;

connectDatabase();

app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`);
});
