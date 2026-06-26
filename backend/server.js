const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const connectDB = require("./config/db");

const uploadRoutes = require("./routes/uploadRoutes");
const errorHandler = require( "./middleware/errorHandler");

connectDB();

const app = express();
app.use(errorHandler);

app.set("trust proxy", 1);


// app.use(cors());
app.use(
  cors({
    origin: [
       "https://mini-ecommerce-gilt.vercel.app/",
      "http://localhost:3000",
     
    ],
    credentials: true,
  })
);


app.use(express.json());

app.use(
  "/api/categories",
  require("./routes/categoryRoutes")
);

app.use(
  "/api/products",
  require("./routes/productRoutes")
);

app.use("/api/upload", uploadRoutes);

app.get("/", (req, res) => {
  res.send("API Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});