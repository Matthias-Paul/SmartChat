import jwt from "jsonwebtoken";
import dotenv from "dotenv"

dotenv.config()     

const generatedToken = async (userId, res)=>{
      const userToken = jwt.sign({userId}, process.env.JWT_SECRET, {
        expiresIn:"7d"
      })

      res.cookie("token",  userToken,{
        httpOnly:true,
        sameSite:true,
      })
                   
}

export default generatedToken;