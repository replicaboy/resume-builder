import mongoose from 'mongoose';

const resumeSchema = new mongoose.Schema({
  // Ek simple identifier taaki pata chale ye kiska resume hai
  userId: { 
    type: String, 
    required: true,
    default: "guest-user" // Abhi authentication nahi hai toh default user maan lete hain
  },
  title: { 
    type: String, 
    required: true, 
    default: "My Resume" 
  },
  
  // Personal Details
  personalInfo: {
    firstName: { type: String, default: "" },
    lastName: { type: String, default: "" },
    email: { type: String, default: "" },
    phone: { type: String, default: "" },
    address: { type: String, default: "" },
    github: { type: String, default: "" },
    linkedin: { type: String, default: "" }
  },

  // Professional Summary
  summary: { type: String, default: "" },

  // Education (Array of objects kyunki multiple degrees ho sakti hain)
  education: [{
    degree: String,
    institution: String,
    startYear: String,
    endYear: String
  }],

  // Experience
  experience: [{
    company: String,
    position: String,
    startDate: String,
    endDate: String,
    description: String
  }],

  // Skills (Array of strings)
  skills: [{ type: String }]

}, { timestamps: true }); // timestamps true karne se createdAt aur updatedAt apne aap add ho jayega

export default mongoose.model('Resume', resumeSchema);