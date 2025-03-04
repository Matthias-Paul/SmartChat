import express from "express"
import dotenv from "dotenv"
import authRoutes from "./routes/auth.route.js"


dotenv.config();
const app = express()

const PORT = process.env.PORT 


app.get("/", (req, res)=>{
    res.send("home Page")
})

app.use("/api/auth/", authRoutes )

app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT} `)
})