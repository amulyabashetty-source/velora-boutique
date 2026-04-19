import "dotenv/config";

import express from "express";
import cors from "cors";
import mongoose from "mongoose";

import productRoutes from "./routes/productRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";

const app = express();

// MIDDLEWARE
app.use(
  cors({
    origin: true, // allow all (for now)
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true })); //  added

// ROUTES
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);

// TEST ROUTE
app.get("/", (req, res) => {
  res.send("Velora API Running...");
});

// GLOBAL ERROR HANDLER
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: "Something went wrong",
  });
});

// DATABASE + SERVER START
const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("DB Error:", err.message);
    process.exit(1);
  });