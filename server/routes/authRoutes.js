import express from "express";
import Admin from "../models/Admin.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// ✅ IMPORT NEW CONTROLLERS
import {
  forgotPassword,
  resetPassword,
} from "../controllers/authController.js";

const router = express.Router();

// ➤ Register Admin
router.post("/register", async (req, res) => {
  try {
    const { email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = new Admin({
      email,
      password: hashedPassword,
    });

    await admin.save();

    res.json({ message: "Admin created ✅" });
  } catch (err) {
    res.status(500).json(err);
  }
});

// ➤ Login Admin
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ email });

    if (!admin) {
      return res.status(400).json({ message: "Invalid email ❌" });
    }

    const isMatch = await bcrypt.compare(password, admin.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Wrong password ❌" });
    }

    const token = jwt.sign(
      { id: admin._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({ token });

  } catch (err) {
    res.status(500).json(err);
  }
});

// ❌ DELETE ADMIN
router.delete("/delete/:email", async (req, res) => {
  try {
    const { email } = req.params;

    const deleted = await Admin.findOneAndDelete({ email });

    if (!deleted) {
      return res.status(404).json({ message: "Admin not found ❌" });
    }

    res.json({ message: "Admin deleted ✅" });

  } catch (err) {
    res.status(500).json(err);
  }
});


// ✅ NEW ROUTES (VERY IMPORTANT)
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);

export default router;