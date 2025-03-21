import { Server } from "socket.io";
import http from "http";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(cors({ origin: ["https://smartChat-wtxa.onrender.com"], credentials: true }));
app.use(cookieParser());
app.use(express.json()); 


const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: ["https://smartChat-wtxa.onrender.com"], //  "https://smartChat-wtxa.onrender.com"
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  },
});

 export const getReceiverId = (receiverId)=>{
    return userSocketMap[receiverId]
 } 

const userSocketMap = {};

io.on("connection", (socket) => {
  console.log("A user connected", socket.id);

  const userId = socket.handshake.query.userId
  if(userId != "undefined") userSocketMap[userId] = socket.id

  io.emit("getOnlineUsers", Object.keys(userSocketMap))
 
  socket.on("disconnect", () => {
    console.log("A user disconnected", socket.id);
     delete userSocketMap[userId]
     io.emit("getOnlineUsers", Object.keys(userSocketMap))

  });
});

export { app, io, server };
