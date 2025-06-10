import { config } from "dotenv";
import { connectDB } from "../lib/db.js";
import User from "../models/user.model.js";

config();

const seedUsers = [
  {
    email: "wonder.kid@example.com",
    fullName: "Kobbie Mainoo",
    password: "123456",
    profilePic: "https://centredevils.co.uk/wp-content/uploads/2024/08/Kobbie-Mainoo.webp",
  },
  {
    email: "the.diddler@example.com",
    fullName: "P Diddler",
    password: "123456",
    profilePic: "https://media.gettyimages.com/id/104969312/photo/sean-p-diddy-combs-visits-mtvs-trl-to-celebrate-bad-boys-10th-anniversary.jpg?s=612x612&w=gi&k=20&c=xw5naRCRru3XZRHbOMBtWufqCRbz8-CWfyZjvhRxmcQ=",
  },
  {
    email: "lebron.james@example.com",
    fullName: "LeBron James",
    password: "123456",
    profilePic: "https://i.scdn.co/image/ab67616d0000b27329e4f9c4b90d85a52b4eb6b3",
  },
  {
    email: "dora.explores@example.com",
    fullName: "Dora Márquez",
    password: "123456",
    profilePic: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjj7qaqmr3SUvxIb3E-iMgXjfzcAmoEGQO7A&s",
  },
  {
    email: "tsehay.temaru@example.com",
    fullName: "Tsehay Memar",
    password: "123456",
    profilePic: "https://upload.wikimedia.org/wikipedia/en/thumb/e/e0/Tsehai_Loves_Learning.jpeg/250px-Tsehai_Loves_Learning.jpeg",
  },
  {
    email: "mariah.riddlesprigger@example.com",
    fullName: "Mariah Riddlesprigger",
    password: "123456",
    profilePic: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYjYFZOm9ZYt6VXtL9C8gzcidHRLC55A7x5w&s",
  },
];

const seedDatabase = async () => {
  try {
    await connectDB();

    await User.insertMany(seedUsers);
    console.log("Database seeded successfully");
  } catch (error) {
    console.error("Error seeding database:", error);
  }
};

seedDatabase();