import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    const rawHost = conn.connection.host;
    const shortHost = rawHost.length > 6 ? `${rawHost.slice(0, 6)}...` : rawHost;

    console.log("[MONGODB] Connected successfully:", shortHost);
  } catch (error) {
    console.error("[MONGODB] Connection error:", error);
  }
}