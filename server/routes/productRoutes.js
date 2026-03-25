import express from "express";
import Product from "../models/Product.js";
import upload from "../middleware/upload.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// ➤ Add Product
router.post("/add", authMiddleware, upload.single("image"), async (req, res) => {
  try {
    const { name, price, category, description, image } = req.body;

    let imageUrl = "";

    // ✅ FILE upload
    if (req.file) {
      imageUrl = req.file.path;

    // ✅ URL upload
    } else if (image) {
      const result = await cloudinary.uploader.upload(image);
      imageUrl = result.secure_url;

    } else {
      return res.status(400).json({ error: "Image required" });
    }

    const product = new Product({
      name,
      price,
      category,
      description,
      image: imageUrl,
    });

    await product.save();

    res.json({ success: true, product });

  } catch (error) {
    console.log("ERROR:", error);
    res.status(500).json({ error: error.message });
  }
});
// ➤ Get All Products (NEWEST FIRST ✅)
router.get("/", async (req, res) => {
  try {
    const products = await Product.find().sort({ _id: -1 });
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ➤ Update Product
router.put("/:id", authMiddleware, upload.single("image"), async (req, res) => {
  try {
    const { name, price, category, description } = req.body;

    let updatedData = {
      name,
      price,
      category,
      description,
    };

    if (req.file) {
      updatedData.image = req.file.path;
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      updatedData,
      { new: true }
    );

    res.json(updatedProduct);

  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

// ➤ Delete Product
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Product deleted" });
  } catch (err) {
    res.status(500).json(err);
  }
});

export default router;



