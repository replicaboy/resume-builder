import express from 'express';
import Resume from '../models/Resume.js';

const router = express.Router();

// 1. POST Route: Naya resume save karne ya purane ko update karne ke liye
router.post('/', async (req, res) => {
  try {
    const { userId } = req.body;
    
    // Agar user ka pehle se resume hai toh usko update karo, warna naya bana do (upsert: true)
    let resume = await Resume.findOneAndUpdate(
      { userId: userId || "guest-user" },
      req.body,
      { new: true, upsert: true }
    );
    
    res.status(200).json({ success: true, data: resume });
  } catch (error) {
    console.error("Error saving resume:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

// 2. GET Route: User ka resume database se nikalne ke liye
router.get('/:userId', async (req, res) => {
  try {
    const resume = await Resume.findOne({ userId: req.params.userId });
    
    if (!resume) {
      return res.status(404).json({ success: false, message: 'Resume not found' });
    }
    
    res.status(200).json({ success: true, data: resume });
  } catch (error) {
    console.error("Error fetching resume:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

export default router;