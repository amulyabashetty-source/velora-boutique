import express from "express";
import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const router = express.Router();

// ✅ REGISTER USER
// ✅ REGISTER USER
router.post("/register", async (req, res) => {
  try {
    const { name, email, password, phone } = req.body; // ⭐ ADD phone

    const existing = await User.findOne({ email });

    if (existing) {
      return res.status(400).json({ message: "User already exists ❌" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      password: hashedPassword,
      phone // ⭐ ADD THIS
    });

    await user.save();

    res.json({ message: "User registered ✅" });

  } catch (err) {
    console.log("REGISTER ERROR:", err); // ⭐ DEBUG
    res.status(500).json(err);
  }
});


// ✅ LOGIN USER
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Invalid email ❌" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Wrong password ❌" });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      token,
      user: {
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin
      }
    });

  } catch (err) {
    res.status(500).json(err);
  }
});

export default router;