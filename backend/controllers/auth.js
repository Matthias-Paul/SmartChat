import User from "../models/user.model.js"
import bcryptjs from "bcryptjs";
import generatedToken from "../utils/generateToken.js"


export const signUp = async (req, res)=>{

try {
    const { fullName, username, password, confirmPassword, gender, email } = req.body;
    if(!fullName || !username || !password || !confirmPassword || !gender || !email || fullName.trim() ==="" || username.trim() ==="" || password.trim() ==="" || confirmPassword.trim() ==="" || gender.trim() ==="" || email.trim() ===""){

        return res.status(400).json({
            statusCode: 400,
            success: false,
            message:"All fields are required "})
    }
    
    if(password.length < 4 ){
        return res.status(400).json({
            statusCode: 400,
            success: false,
            message: "Password must have at least four characters",
        }); 
    }
 
    if (password !== confirmPassword){
        return res.status(400).json({
            statusCode: 400,
            success: false,
            message:"Password does not match confirm password "
        })  
    }

const user = await User.findOne({username})

if(user){    

    return res.status(400).json({
        statusCode: 400,
        success: false,
        message:"Username already exists! "
    })
}

const userEmail = await User.findOne({email})

if(userEmail){    

    return res.status(400).json({
        statusCode: 400,
        success: false,
        message:"Email already exists! "
    })
}

const hashPassword = await bcryptjs.hash(password, 10);

const newUser = new User({
    fullName,
    username,
    email,
    password:hashPassword,
    gender,
})
const token =await generatedToken(newUser._id, res)


await newUser.save()

const { password:pass, ...rest} = newUser._doc

return res.status(201).json({
    statusCode: 201,
    success: true,       
    user: rest,
 
})
console.log(newUser)
} catch (error) {  
    console.log(error.message)

    
    return res.status(500).json({
        statusCode: 500,
        success: false,
        message:"Internal Server Error"
    })
}
  
}


export const logIn = async (req, res) => {
    try {
        const { username, password } = req.body;

          if(!username || !password || username.trim() ==="" || password.trim() ==="" ){

        return res.status(400).json({
            statusCode: 400,
            success: false,
            message:"All fields are required "})
    }

        // Check if user exists
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({   
                statusCode: 400,
                success: false,
                message: "Invalid username or password!",
            });
        }

        const isCorrectPassword = await bcryptjs.compare(password, user.password);
        if (!isCorrectPassword) {
            return res.status(400).json({
                statusCode: 400,
                success: false,
                message: "Incorrect password!",
            });
        }

       
        const token = await generatedToken(user._id, res);
            console.log(token)
  
        const { password: pass, ...rest } = user.toObject();

        return res.status(200).json({
            statusCode: 200,
            success: true,            
            user: rest,
        
        });   

    } catch (error) {   
        console.error(error.message);
        return res.status(500).json({
            statusCode: 500,
            success: false,
            message: "Internal Server Error",
        });
    }
};




export const logOut = async (req, res)=>{

  try {
      
    res.clearCookie("token", {
      httpOnly: true,
      sameSite: "strict",
    });   

    return res.status(200).json({
        statusCode: 200,
        success: true,
        message:"User log out successfully"
        
    })


  } catch (error) {
     console.log(error.message)

    
    return res.status(500).json({
        statusCode: 500,
        success: false,
        message:"Internal Server Error"
    })
  }
   
}



