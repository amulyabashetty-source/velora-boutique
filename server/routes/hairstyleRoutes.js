import express from "express";
import multer from "multer";
import {
  addHairstyle,
  getHairstyles,
  deleteHairstyle,
} from "../controllers/hairstyleController.js";

const router = express.Router();

const upload = multer({ dest: "uploads/" });

router.post("/", upload.single("image"), addHairstyle);
router.get("/", getHairstyles);
router.delete("/:id", deleteHairstyle); 
export default router;