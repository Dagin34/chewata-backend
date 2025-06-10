import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser'
import cors from 'cors';

import { connectDB } from './lib/db.js';
import authRoutes from './routes/auth.route.js';
import messageRoutes from './routes/message.route.js';
import { app, server } from './lib/socket.js';

dotenv.config();
const PORT = process.env.PORT || 5200;

const allowedOrigins = [
  'http://localhost:5173',
  'https://chewata-chatting.vercel.app', 
];

app.use(express.json({ limit: '5mb' }));
app.use(cookieParser());
// app.use(cors({
//   origin: "https://chewata-chatting.vercel.app",
//   credentials: true,
// }));
app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'], 
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

//.. Routes
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

//.. Listen here
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  connectDB();
});