const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const connectDB = require("./config/db");

dotenv.config();

connectDB();

const app = express();
const heroRoutes = require(
  "./routes/heroRoutes"
);

app.use(cors());

app.use(express.json());

app.use(
  "/api/categories",
  require("./routes/categoryRoutes")
);

app.use(
  "/api/products",
  require("./routes/productRoutes")
);

app.use("/api/heroes", heroRoutes);

app.get("/", (req, res) => {
  res.send("API Running");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});