import express from "express"
import { generateOTP, verifyOTP, createResetSession, resetPassword  } from "../controllers/password.js"
const router = express.Router()
import { localVariable } from "../middleware/protectRoute.js"

     

router.post("/generate-OTP", localVariable,  generateOTP)
router.get("/verify-OTP", localVariable,  verifyOTP)
router.get("/create-resetSession", localVariable,  createResetSession)
router.put("/reset-password",  localVariable,  resetPassword)

  

   
export default router;