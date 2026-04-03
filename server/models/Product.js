import mongoose from "mongoose";

// ⭐ Review Schema (NEW)
const reviewSchema = new mongoose.Schema(
  {
    user: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// ⭐ Product Schema
const productSchema = new mongoose.Schema(
  {
    name: String,
    price: Number,
    category: String,
    description: String,

    // ✅ Existing
    images: [String],

    fabric: String,
    occasion: String,
    pattern: String,
    care: String,
    origin: String,

    // ⭐ NEW (for rating system)
    reviews: [reviewSchema],

    averageRating: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);