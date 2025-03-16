import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import cookieParser from "cookie-parser" 


import authRoutes from "./routes/auth.route.js"
import messagesRoutes from "./routes/messages.route.js"
import usersRoutes from "./routes/users.route.js"
    

import connectToMongoDB from "./database/connectToMongo.js" 

import path from "path";


dotenv.config();
const app = express()

const PORT = process.env.PORT 

app.use(cors({
    origin: ["http://localhost:5174"], // Add your frontend's deployed URL
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  }));
  
  
  
  // Middleware
  app.use(express.json());
  app.use(cookieParser())

const _dirname = path.resolve()

app.get("/", (req, res)=>{
    res.send("home Page")
})

app.use("/api/auth/", authRoutes )
app.use("/api/messages/", messagesRoutes )
app.use("/api/users/", usersRoutes )


app.use(express.static(path.join(_dirname, "/frontend/dist")));

app.get("*", (req, res) =>
  res.sendFile(path.join(_dirname, "/frontend/dist/index.html"))
);


app.listen(PORT, ()=>{
    connectToMongoDB()
    console.log(`Server running on port ${PORT} `)
})