import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";


import authRoutes from "./routes/auth.route.js";
import messagesRoutes from "./routes/messages.route.js";
import usersRoutes from "./routes/users.route.js";
import passwordRoutes from "./routes/password.route.js";

import { app, server } from "./socket/socket.js"
import connectToMongoDB from "./database/connectToMongo.js";

dotenv.config();



const PORT = process.env.PORT || 5000; 





app.use(
  cors({
    origin: ["https://smartChat-wtxa.onrender.com"],   
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,  
  })
);


app.use(express.json());
app.use(cookieParser());

const _dirname = path.resolve()

    
                     


app.use("/api/auth", authRoutes);
app.use("/api/messages", messagesRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/password", passwordRoutes);


// Catch-all route for serving frontend
app.use(express.static(path.join(_dirname, "/frontend/dist")))
        
app.get("*", (req, res)  => res.sendFile(path.join(_dirname, "/frontend/dist/index.html")))

server.listen(PORT, () => {
  connectToMongoDB();
  console.log(` Server running on port ${PORT}`);
});


