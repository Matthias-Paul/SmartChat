import express from "express"
import { sendMessage, getMessage, getConversations  } from "../controllers/message.js"
import protectRoute from "../middleware/protectRoute.js"
const router = express.Router()



router.get("/get-message/:id", protectRoute, getMessage)
router.post("/send-message/:id", protectRoute, sendMessage)
router.post("/get-conversations", protectRoute, getConversations)



export default router;