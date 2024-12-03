import mongoose from "mongoose";

const connectDB = async () => {
  const mongoUri = process.env.MONGODB_URI;
  try {
    await mongoose.connect(mongoUri);
    console.log("Successfully connect Database ✅");
  } catch (error) {
    console.log(error);
  }
};

export default connectDB;
