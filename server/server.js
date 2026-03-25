import dotenv from "dotenv";
dotenv.config({ path: "./.env" }); // ✅ IMPORTANT FIX

import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import productRoutes from "./routes/productRoutes.js";
import authRoutes from "./routes/authRoutes.js";


const app = express();

// ✅ middleware
app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
// ✅ routes
app.use("/api/products", productRoutes);

// ✅ DB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected ✅"))
  .catch((err) => console.log("DB Error:", err));

// ✅ test route
app.get("/", (req, res) => {
  res.send("Velora API Running...");
});

// ✅ server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});