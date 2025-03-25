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
      return res.status(400).json({ success: false, message: "Email is required" });
    }
    
    const userEmail = await User.findOne({ email });

    if (!userEmail) {
      return res.status(400).json({ success: false, message: "Please enter a correct email address!" });
    }

    const OTP = OTPGenerator.generate(6, { upperCaseAlphabets: false, lowerCaseAlphabets: false, specialChars: false });

    // Store OTP in the user's database record
    userEmail.otp = OTP;
    await userEmail.save();

    console.log("Generated OTP:", OTP);

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Secure OTP Verification",
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px; margin: auto; border: 1px solid #ddd; border-radius: 10px;">
          <h2 style="color: #0056b3; text-align: center;">🔒 Secure OTP Verification</h2>
          <p>Dear ${userEmail?.fullName || "User"},</p>
          <p>You have requested a One-Time Password (OTP) for verification. Please use the OTP below to proceed:</p>
          <p style="font-size: 24px; font-weight: bold; text-align: center; color: #000;">${OTP}</p>
          <p>Do not share this OTP with anyone.</p>
          <p>If you did not request this OTP, please ignore this email.</p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    return res.status(201).json({ success: true, message: "OTP sent successfully to your email." });
  } catch (error) {
    console.error("Error sending OTP:", error);
    return res.status(500).json({ success: false, message: "Error generating OTP" });
  }
};


export const verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.query;

    if (!otp || !email) {
      return res.status(400).json({ success: false, message: "OTP is required" });
    }

    const user = await User.findOne({ email });

    if (!user || user.otp !== otp) {
      return res.status(400).json({ success: false, message: "Invalid OTP" });
    }

    // Clear OTP after verification
    user.otp = null;
    await user.save();

    return res.status(200).json({ success: true, message: "OTP verified successfully" });
  } catch (error) {
    console.error("Error verifying OTP:", error);
    return res.status(500).json({ success: false, message: "Internal server error" });
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
    const { email } = req.query;
    const { password, confirmPassword } = req.body;

    if ( !password || !confirmPassword) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ success: false, message: "Passwords do not match" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    user.otp = null; // Clear OTP after reset
    await user.save();

    return res.status(200).json({ success: true, message: "Password reset successfully" });
  } catch (error) {
    console.error("Error resetting password:", error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};
