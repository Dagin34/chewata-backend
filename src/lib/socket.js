import { Server } from 'socket.io';
import http from 'http'
import express from 'express';
import jwt from 'jsonwebtoken';
import cookie from 'cookie';

const app = express();
const server = http.createServer(app)

const io = new Server(server, {
  cors: {
    origin: [
      "http://localhost:5173",             // Development
      "https://chewata-chatting.vercel.app" // Production
    ],
    credentials: true,
  },
});

//.. Authenticate the handshake using the same JWT cookie as REST requests instead of
//.. trusting the client-supplied `userId` query param, which anyone could spoof to
//.. hijack another user's online status and receive their real-time messages.
io.use((socket, next) => {
  try {
    const cookies = cookie.parse(socket.handshake.headers.cookie || "");
    const token = cookies.jwt;
    if (!token) return next(new Error("Unauthorized - No Token Provided!"));

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    socket.userId = decoded.id;
    next();
  } catch (error) {
    next(new Error("Unauthorized - Invalid Token!"));
  }
});

export function getReceiverSocketId(userId) {
  return userSocketMap[userId];
}

//.. Online users... {UserId: socketId}
const userSocketMap = {};

io.on("connection", (socket) => {
  console.log("[SOCKET] User Connected!")

  userSocketMap[socket.userId] = socket.id

  //.. Used to send events to all connected clients
  io.emit("getOnlineUsers", Object.keys(userSocketMap))

  socket.on("disconnect", () => {
    console.log("[SOCKET] User Disconnected!")
    delete userSocketMap[socket.userId]
    io.emit("getOnlineUsers", Object.keys(userSocketMap))
  })
})

export { io, app, server };