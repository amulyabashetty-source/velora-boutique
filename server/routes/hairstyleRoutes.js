import express from "express";
import multer from "multer";
import {
  addHairstyle,
  getHairstyles,
} from "../controllers/hairstyleController.js";

const router = express.Router();

const upload = multer({ dest: "uploads/" });

router.post("/", upload.single("image"), addHairstyle);
router.get("/", getHairstyles);

export default router;