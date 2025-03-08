import express from "express"
import { sendMessage, getMessage  } from "../controllers/message.js"
import protectRoute from "../middleware/protectRoute.js"
const router = express.Router()



router.get("/get-message/:id", protectRoute, getMessage)
router.post("/send-message/:id", protectRoute, sendMessage)



export default router;