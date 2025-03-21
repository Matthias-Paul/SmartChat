import Message from "../models/message.model.js"
import {getReceiverId, io} from "../socket/socket.js"
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



     

    await newMessage.save();  

    if(newMessage){
        conversation.messages.push(newMessage._id)
    }


    await conversation.save(); 
 
     const receiverSocketId = getReceiverId(receiverId)
     if (receiverSocketId){
      io.to(receiverSocketId).emit("newMessage", newMessage)
     }

       res.status(201).json({
            statusCode: 201,
            success: true,
            newMessage,
       })
       console.log(newMessage)
    } catch (error) {     
    console.log(error.message)

    return res.status(500).json({
        statusCode: 500,
        success: false,
        message:"Internal Server Error"    
    })
}

}

export const getMessage = async (req, res) => {
  try {
    const { id: userToChatId } = req.params;
    const senderId = req.user?._id;
    if (!senderId) {
      return res.status(401).json({
        statusCode: 401,
        success: false,
        message: "Unauthorized: User not authenticated",
      });
    }

    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, userToChatId] },
    }).populate("messages");

    if (!conversation) {
      return res.status(404).json({
        statusCode: 404,
        success: false,
        message: "No conversation found",
      });
    }

    res.status(200).json({
      statusCode: 200,            
      success: true,
      conversationMessage: conversation.messages,
    });
  } catch (error) {
    console.error("Error fetching messages:", error.message);

    return res.status(500).json({
      statusCode: 500,
      success: false,
      message: "Internal Server Error",
    });
  }
};


