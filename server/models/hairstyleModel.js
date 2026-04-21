import mongoose from "mongoose";

const hairstyleSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    faceShape: {
      type: String,
      required: true,
    },
    occasion: {
      type: String,
      required: true, 
    },
    image: {
      type: String,
      required: true, 
    },
  },
  { timestamps: true }
);

const Hairstyle = mongoose.model("Hairstyle", hairstyleSchema);
export default Hairstyle;