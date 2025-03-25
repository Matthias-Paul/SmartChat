import OTPGenerator from "otp-generator";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import User from "../models/user.model.js"


dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER, 
    pass: process.env.EMAIL_PASS,
  },
});


export const generateOTP = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({
        statusCode: 400,
        success: false,
        message: "Email is required",
      });
    }
    
    const userEmail = await User.findOne({email})

    if(!userEmail){    

    return res.status(400).json({
        statusCode: 400,
        success: false,
        message:"Please enter a correct email address! "
    })
}
    
    const OTP = OTPGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });

    req.app.locals.OTP = OTP; 
    console.log("Generated OTP:", OTP);

    
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Your OTP Code",
       html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px; margin: auto; border: 1px solid #ddd; border-radius: 10px; box-shadow: 2px 2px 10px rgba(0,0,0,0.1);">
          <h2 style="color: #0056b3; text-align: center;">🔒 Secure OTP Verification</h2>
          <p>Dear, ${userEmail.fullName}</p>
          <p>You have requested a One-Time Password (OTP) for verification. Please use the OTP below to proceed:</p>
          <p style="font-size: 24px; font-weight: bold; text-align: center; color: #000;">${OTP}</p>
          <p> Do not share this OTP with anyone.</p>
          <p>If you did not request this OTP, please ignore this email.</p>
          <hr>
        
        </div>
      `,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    return res.status(201).json({
      statusCode: 201,
      success: true,   
      message: "OTP sent successfully to your email.",
    });
  } catch (error) {
    console.error("Error sending OTP:", error);
    return res.status(500).json({
      statusCode: 500,
      success: false,
      message: "Error generating OTP",
    });
  }
};


export const verifyOTP = async (req, res) => {
  try {
    const { OTP } = req.query;
    
    if (!OTP) {
      return res.status(400).json({
        statusCode: 400,
        success: false,
        message: "OTP is required",
      });
    }

    if (parseInt(req.app.locals.OTP) === parseInt(OTP)) {
      req.app.locals.OTP = null;
      req.app.locals.resetSession = true;

      return res.status(200).json({
        statusCode: 200,
        success: true,
        message: "OTP verified successfully",
      });
    }

    return res.status(400).json({
      statusCode: 400,
      success: false,
      message: "Invalid OTP",
    });
  } catch (error) {
    console.error("Error verifying OTP:", error);
    return res.status(500).json({
      statusCode: 500,
      success: false,
      message: "Internal server error",
    });
  }
};

export const createResetSession = async (req, res) => {
  try {
    if (req.app.locals.resetSession) {
      req.app.locals.resetSession = false;
      return res.status(200).json({
        statusCode: 200,
        success: true,
        message: "Access granted",
      });
    }

    return res.status(440).json({
      statusCode: 440,
      success: false,
      message: "Session expired",
    });
  } catch (error) {
    console.error("Error creating reset session:", error);
    return res.status(500).json({
      statusCode: 500,
      success: false,
      message: "Internal server error",
    });
  }
};

export const resetPassword = async (req, res) => {
  try {
    if (!req.app.locals.resetSession) {
      return res.status(440).json({
        statusCode: 440,
        success: false,
        message: "Session expired",
      });
    }

    const { email, password, confirmPassword } = req.body;

    if (!email || !password || !confirmPassword) {
      return res.status(400).json({
        statusCode: 400,
        success: false,
        message: "All fields are required",
      });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({
        statusCode: 400,
        success: false,
        message: "Passwords do not match",
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        statusCode: 404,
        success: false,
        message: "User not found",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await User.updateOne({ email }, { password: hashedPassword });

    return res.status(200).json({
      statusCode: 200,
      success: true,
      message: "Password reset successfully",
    });
  } catch (error) {
    console.error("Error resetting password:", error);
    return res.status(500).json({
      statusCode: 500,
      success: false,
      message: "Internal server error",
    });
  }
};
