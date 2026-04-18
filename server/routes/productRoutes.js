import express from "express";
import Product from "../models/Product.js";
import upload from "../middleware/upload.js";
import authMiddleware from "../middleware/authMiddleware.js";
import cloudinary from "../config/cloudinary.js";

const router = express.Router();

// =======================
// ADD PRODUCT
// =======================
router.post(
  "/add",
  authMiddleware,
  upload.array("images", 5),
  async (req, res) => {
    try {
      const {
        name,
        price,
        category,
        imageUrls,
        description,
        fabric,
        occasion,
        pattern,
        care,
        origin,
      } = req.body;

      if (!name || !price || !category) {
        return res.status(400).json({ message: "Required fields missing" });
      }

      let imageArray = [];

      // FILE UPLOAD
      if (req.files?.length > 0) {
        imageArray.push(...req.files.map((file) => file.path));
      }

      // IMAGE URLS
      if (imageUrls) {
        const urls = imageUrls.split(",").map((url) => url.trim());

        for (let url of urls) {
          const result = await cloudinary.uploader.upload(url);
          imageArray.push(result.secure_url);
        }
      }

      if (imageArray.length === 0) {
        return res.status(400).json({ message: "Images required" });
      }

      const product = new Product({
        name,
        price,
        category,
        description,
        images: imageArray,
        fabric,
        occasion,
        pattern,
        care,
        origin,
      });

      await product.save();

      res.json({ success: true, product });

    } catch (error) {
      console.log("ADD ERROR:", error);
      res.status(500).json({ message: error.message });
    }
  }
);


// =======================
// UPDATE PRODUCT
// =======================
router.put(
  "/:id",
  authMiddleware,
  upload.array("images", 5),
  async (req, res) => {
    try {
      const {
        name,
        price,
        category,
        description,
        imageUrls,
        fabric,
        occasion,
        pattern,
        care,
        origin,
      } = req.body;

      let imageArray = [];

      if (req.files?.length > 0) {
        imageArray.push(...req.files.map((file) => file.path));
      }

      if (imageUrls) {
        const urls = imageUrls.split(",").map((url) => url.trim());

        for (let url of urls) {
          const result = await cloudinary.uploader.upload(url);
          imageArray.push(result.secure_url);
        }
      }

      const updatedData = {
        name,
        price,
        category,
        description,
        fabric,
        occasion,
        pattern,
        care,
        origin,
      };

      if (imageArray.length > 0) {
        updatedData.images = imageArray;
      }

      const updated = await Product.findByIdAndUpdate(
        req.params.id,
        updatedData,
        { new: true }
      );

      if (!updated) {
        return res.status(404).json({ message: "Product not found" });
      }

      res.json(updated);

    } catch (error) {
      console.log("UPDATE ERROR:", error);
      res.status(500).json({ message: error.message });
    }
  }
);


// =======================
// GET ALL PRODUCTS
// =======================
router.get("/", async (req, res) => {
  try {
    const products = await Product.find().sort({ _id: -1 });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// =======================
// GET SINGLE PRODUCT
// =======================
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// =======================
// DELETE PRODUCT
// =======================
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({ message: "Deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// =======================
// ADD REVIEW
// =======================
router.post("/:id/review", async (req, res) => {
  try {
    const { user, rating, comment } = req.body;

    if (!user || !rating || !comment) {
      return res.status(400).json({ message: "All fields required" });
    }

    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const newReview = {
      user,
      rating: Number(rating),
      comment,
    };

    product.reviews.push(newReview);

    const total = product.reviews.reduce(
      (sum, item) => sum + item.rating,
      0
    );

    product.averageRating = total / product.reviews.length;

    await product.save();

    res.json({
      success: true,
      message: "Review added",
      product,
    });

  } catch (error) {
    console.log("REVIEW ERROR:", error);
    res.status(500).json({ message: error.message });
  }
});

export default router;