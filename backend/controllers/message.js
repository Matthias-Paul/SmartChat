import Message from "../models/message.model.js"

import Conversation from "../models/conversation.model.js"



export const sendMessage = async (req, res)=>{

try {         
   
    const { message } = req.body;
    const {id: receiverId} = req.params;
    const senderId = req.user._id

    let conversation = await Conversation.findOne({
        participants:{ $all: [senderId, receiverId] }
    })     

    if(!conversation){
        conversation = await Conversation.create({
            participants: [ senderId, receiverId ]
        })
    }

    const newMessage = new Message({
        senderId,
        receiverId,
        message,
    }) 


    // await newMessage.save()
    // await conversation.save()
     

    await newMessage.save();  

    if(newMessage){
        conversation.messages.push(newMessage._id)
    }


    await conversation.save(); 
 
     

       res.status(201).json({
            statusCode: 201,
            success: true,
            message:"Message sent successfully",
            newMessage,
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

export  const  getMessage = async (req, res)=>{
try {
    
    const { id:userToChatId } = req.params;
    const senderId = req.user._id

    let conversation = await Conversation.findOne({
        participants:{ $all: [senderId, userToChatId] }
    }).populate("messages") 


    res.status(200).json({
        statusCode: 200,
        success: true,
        conversationMessage: conversation.messages
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

