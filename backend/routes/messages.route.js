import express from "express"
import { sendMessage  } from "../controllers/message.js"

const router = express.Router()


router.post("/send-message/:senderId", sendMessage)



export default router;