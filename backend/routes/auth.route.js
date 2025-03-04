import express from "express"
import { signUp, logIn, logOut  } from "../controllers/auth.js"

const router = express.Router()



router.post("/sign-up", signUp)
router.post("/log-in", logIn)
router.post("/log-out", logOut)



export default router;