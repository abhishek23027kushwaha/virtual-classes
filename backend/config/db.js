// ================= DATABASE CONNECTION =================
import mongoose from "mongoose";

const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) {
    return;
  }
  try {
    const mongoUri = process.env.MONGO_URI || process.env.MONGODB_URL;
    await mongoose.connect(mongoUri);
    console.log("MongoDB Connected ✅");
  } catch (error) {
    console.error("MongoDB Error ❌", error.message);
    if (!process.env.VERCEL) {
      process.exit(1);
    }
  }
};

export default connectDB;
