import { config } from "dotenv";
import { connectDB } from "../lib/db.js";
import User from "../models/user.model.js";

config();

const seedUsers = [
  {
    email: "wonder.kid@example.com",
    fullName: "Kobbie Mainoo",
    password: "12345678",
    profilePic: "https://centredevils.co.uk/wp-content/uploads/2024/08/Kobbie-Mainoo.webp",
  },
  {
    email: "lebron.james@example.com",
    fullName: "LeBron James",
    password: "12345678",
    profilePic: "https://i.scdn.co/image/ab67616d0000b27329e4f9c4b90d85a52b4eb6b3",
  },
];

const seedDatabase = async () => {
  try {
    await connectDB();

    await User.insertMany(seedUsers);
    console.log("[SEED] Database seeded successfully");
  } catch (error) {
    console.error("[SEED] Error seeding database:", error);
  }
};

seedDatabase();