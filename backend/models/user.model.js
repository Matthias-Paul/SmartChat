import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    fullName:{
        type:String,
        required:true,
    },
    username:{
        type:String,
        required:true,
        unique:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:mongoose.Schema.Types.Mixed,
        required:true,
        minlength:6,
    },
    profilePicture:{
        type:String,
        default:"https://res.cloudinary.com/drkxtuaeg/image/upload/v1735897100/Image_4_jb0cpq.png",
    },
    gender:{
        type:String,
        required:true,
        enum:["male", "female"]
    },
    otp:{
        type:mongoose.Schema.Types.Mixed,
        unique:true,
    },

},{timestamps: true})

const User = mongoose.model("User", userSchema)

export default User