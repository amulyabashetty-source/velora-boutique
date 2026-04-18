import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import mongoose from "mongoose";

import productRoutes from "./routes/productRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";

const app = express();


  //  MIDDLEWARE


// CORS (Production Ready)
app.use(
  cors({
    origin: process.env.CLIENT_URL || "*", // later replace with Vercel URL
    credentials: true,
  })
);

// Body parser
app.use(express.json());


  //  ROUTES


app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);


  //  TEST ROUTE


app.get("/", (req, res) => {
  res.send("Velora API Running...");
});


  //  DATABASE CONNECTION


mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => {
    console.error("DB Error:", err.message);
    process.exit(1); // stop server if DB fails
  });


  //  GLOBAL ERROR HANDLER


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: "Something went wrong",
  });
});


  //  SERVER START


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});