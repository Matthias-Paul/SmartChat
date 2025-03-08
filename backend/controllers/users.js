import User from "../models/user.model.js"



export const getUsers= async (req, res)=>{

    try {
        const loggedInUserId = req.user._id

        const filteredUser = await User.find({_id : {$ne: loggedInUserId}}).select("-password")

        res.status(200).json({
            statusCode: 200,
            success: true,
            users:filteredUser
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