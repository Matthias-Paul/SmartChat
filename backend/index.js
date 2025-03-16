import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url"; 

import authRoutes from "./routes/auth.route.js";
import messagesRoutes from "./routes/messages.route.js";
import usersRoutes from "./routes/users.route.js";

import connectToMongoDB from "./database/connectToMongo.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000; 


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


app.use(
  cors({
    origin: ["https://smartChat-wtxa.onrender.com"], 
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);


app.use(express.json());
app.use(cookieParser());

// Serve static files BEFORE API routes
app.use(express.static(path.join(__dirname, "/frontend/dist")));

app.get("/", (req, res) => {
  res.send("Home Page");
});

app.use("/api/auth", authRoutes);
app.use("/api/messages", messagesRoutes);
app.use("/api/users", usersRoutes);

// Catch-all route for serving frontend
app.get("*", (req, res) =>
  res.sendFile(path.join(__dirname, "/frontend/dist/index.html"))
);

app.listen(PORT, () => {
  connectToMongoDB();
  console.log(` Server running on port ${PORT}`);
});
