import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/user.model.js";

dotenv.config();

export const protectRoute = async (req, res, next) => {
  try {
    // Get token from cookies
    const userToken = req.cookies.token;

    if (!userToken) {
      return res.status(401).json({
        statusCode: 401,
        success: false,
        message: "Unauthorized, no token provided",
      });
    }

    // Verify token
    const decoded = jwt.verify(userToken, process.env.JWT_SECRET);

    // Find user excluding password
    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      return res.status(404).json({
        statusCode: 404,
        success: false,
        message: "User not found!",
      });
    }

    // Attach user data to request object
    req.user = user;
    next();
  } catch (error) {
    console.log(error.message);

    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({
        statusCode: 401,
        success: false,
        message: "Invalid token. Unauthorized",
      });
    }

    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        statusCode: 401,
        success: false,
        message: "Token has expired. Please log in again",
      });
    }

    return res.status(500).json({
      statusCode: 500,
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const localVariable= (req, res, next)=>{
  req.app.locals = {
    OTP: null,
    resetSession: false
  }
  next()
}

export default protectRoute;
