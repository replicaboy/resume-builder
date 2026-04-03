import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import resumeRoutes from './routes/resumeRoutes.js'; // <-- Ye line add hui hai

dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes Setup
app.use('/api/resumes', resumeRoutes); // <-- Ye line add hui hai

// MongoDB Connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('🔥 MongoDB Connected Successfully!');
  } catch (error) {
    console.error('❌ MongoDB Connection Error:', error.message);
    process.exit(1);
  }
};

connectDB();

// Basic Route Test
app.get('/', (req, res) => {
  res.send('Resume Builder API is running perfectly!');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});