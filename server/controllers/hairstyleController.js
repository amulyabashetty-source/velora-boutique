import Hairstyle from "../models/hairstyleModel.js";


export const addHairstyle = async (req, res) => {
  try {
    const { name, faceShape, occasion, image } = req.body;

    if (!name || !faceShape || !occasion || !image) {
      return res.status(400).json({ message: "All fields required" });
    }

    const hairstyle = new Hairstyle({
      name,
      faceShape,
      occasion,
      image, 
    });

    await hairstyle.save();

    res.status(201).json({ message: "Hairstyle added", hairstyle });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//  Get all hairstyles
export const getHairstyles = async (req, res) => {
  try {
    const hairstyles = await Hairstyle.find();
    res.json(hairstyles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};