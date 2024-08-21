import mongoose from "mongoose";

const connectDB = async () => {
  if (mongoose.connection.readyState > 1) return;
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "resmue_builder",
    });
    console.log("MongoDB up and running");
    return true;
  } catch (error) {
    console.log("Database connection error:", error.message);
    return false;
  }
};

export { connectDB };
