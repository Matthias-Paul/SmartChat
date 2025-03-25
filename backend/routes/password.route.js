import express from "express"
import { generateOTP, verifyOTP, createResetSession, resetPassword  } from "../controllers/password.js"
const router = express.Router()
import localVariable from "../middleware/protectRoute.js"
import protectRoute from "../middleware/protectRoute.js"

     

router.post("/generate-OTP", protectRoute, localVariable,  generateOTP)
router.get("/verify-OTP", protectRoute, localVariable,  verifyOTP)
router.get("/create-resetSession", protectRoute, localVariable,  createResetSession)
router.put("/reset-password", protectRoute, localVariable,  resetPassword)

  

   
export default router;