import profile from "../assets/background.jpg";
import notificationSound from "../assets/notificationSound.mp3"
import { FaPaperPlane } from "react-icons/fa";
import { TiMessages } from "react-icons/ti";
import { useDispatch, useSelector } from "react-redux";
import {
  selectedConversationSuccess,
  setMessagesSuccess
} from "../redux/userSlice.js";
import { useState, useEffect, useRef } from "react";
import toast from "react-hot-toast";
import { useQuery, useQueryClient } from "@tanstack/react-query";

function MessageComponent() {
  const queryClient = useQueryClient();
  const lastMessageRef = useRef();

  const [sendMessage, setSendMessage] = useState("");
  const { loggedInUser, selectedConversation, messages } = useSelector(
    (state) => state.user
  );
  const { socket } = useSelector((state) => state.socket);

  const profilePic = loggedInUser?._id
    ? loggedInUser?.profilePicture
    : selectedConversation?.profilePicture;

  const dispatch = useDispatch();

  const handleBack = () => {
    dispatch(selectedConversationSuccess(null));
  };

  useEffect(() => {
    return () => dispatch(selectedConversationSuccess(null));
  }, [dispatch]);

  useEffect(() => {
    setTimeout(() => {
      lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }, [messages]);


    useEffect(() => {
    if (!socket) return;

    const messageListener = (newMessage) => {
      // Play notification sound if the message is received by the logged-in user
      if (newMessage.sender !== loggedInUser?._id) {
        const sound = new Audio(notificationSound);
        sound.play();
      }

      dispatch(setMessagesSuccess([...messages, newMessage]));
    };

    socket.on("newMessage", messageListener);

    return () => {
      socket.off("newMessage", messageListener);
    };
  }, [socket, messages, dispatch, loggedInUser]);

  // Fetch Messages
  const { data } = useQuery({
    queryKey: ["conversation", selectedConversation?._id],
    queryFn: async () => {
      if (!selectedConversation?._id) return null;
      const res = await fetch(
        `https://smartChat-wtxa.onrender.com/api/messages/get-message/${selectedConversation._id}`,
        {
          method: "GET",
          credentials: "include",
        }
      );

      if (!res.ok) throw new Error("Failed to fetch conversation");

      return res.json();
    },
    enabled: !!selectedConversation?._id,
  });

  useEffect(() => {
    if (data?.conversationMessage) {
      dispatch(setMessagesSuccess(data.conversationMessage));
      console.log("Fetched conversation:", data.conversationMessage);
    } else {
      console.log("No messages found or failed to fetch.");
      dispatch(setMessagesSuccess([]));
      toast.error("No message yet")
    }
  }, [data, dispatch]);

  // Listen for New Messages from Socket.io
 

  const handleSendMessage = async (e) => {
  e.preventDefault();
  if (!sendMessage.trim() || !selectedConversation?._id) return;

  const messageData = {
    message: sendMessage, 
  };

  try {
    
    const res = await fetch(
      `https://smartChat-wtxa.onrender.com/api/messages/send-message/${selectedConversation._id}`,
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(messageData),
      }
    );

    if (!res.ok) {
      throw new Error("Failed to send message");
    }

    const savedMessage = await res.json(); 
    socket.emit("sendMessage", savedMessage.newMessage);
   
    dispatch(setMessagesSuccess([...messages, savedMessage.newMessage]));

    setSendMessage("");
  } catch (error) {
    console.error("Message send error:", error);
    toast.error("Failed to send message");
  }
};

  return (
    <>
      {!selectedConversation ? (
        <div className="w-full m-auto px-[10px] pt-[65px] overflow-x-auto h-screen flex justify-center items-center bg-black text-white opacity-[0.5]">
          <div className="m-auto text-[30px] hidden sm:flex text-center flex-col">
            <div>Welcome {loggedInUser?.username}</div>
            <div>Select a chat to start messaging</div>
            <TiMessages className="m-auto text-[70px]" />
          </div>
        </div>
      ) : (
        <div className="flex-1 max-w-[1000px] hidden sm:flex relative bg-black text-white opacity-[0.5]">
          <div className="pt-[65px] pb-[85px] flex flex-col w-full h-screen overflow-y-auto space-y-[20px]">
            <div className="bg-gray-500 w-full bg-black pl-[10px] px-[-12px] absolute flex justify-between text-white p-[15px] gap-x-[10px] text-[24px]">
              <div onClick={handleBack} className="inline text-[20px] cursor-pointer">
                &#8592; Back
              </div>
              <div className="text-pink-100">{selectedConversation?.fullName}</div>
            </div>
            
            {messages?.length > 0 ? (
              messages.map((msg, index) => (
                <div
                  key={msg._id || index}
                  ref={lastMessageRef}
                  className={`flex ${index === 0 ? "pt-[75px] " : ""} px-[12px] w-full flex-col `}
                >
                  <div
                    className={`flex ${msg?.senderId === loggedInUser?._id ? "flex-row-reverse " : ""} gap-x-[5px] items-center`}
                  >
                    <img className="w-[40px] h-[40px] flex-shrink-0 rounded-[50%]" src={profilePic || profile} alt="Profile" />
                    <div
                      className={`bg-gray-800 ${msg?.senderId === loggedInUser?._id ? "" : "bg-white text-black "} rounded-md overflow-wrap max-w-[500px] p-[6px]`}
                    >
                      {msg?.message}
                    </div>
                  </div>

                  <div className={`float-right ${msg?.senderId === loggedInUser?._id ? "" : "flex-row-reverse ml-[45px] "} flex justify-end mr-[45px] text-gray-400 text-sm`}>
                    {msg?.createdAt ? new Date(msg.createdAt).toLocaleTimeString() : ""}
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center pt-[75px] text-[18px] text-gray-400">No messages yet</div>
            )}
          </div>

          <div className="max-w-[998px] w-full absolute bottom-1 bg-black">
            <form onSubmit={handleSendMessage}>
              <div className="relative px-[12px]">
                <input
                  value={sendMessage}
                  onChange={(e) => setSendMessage(e.target.value)}
                  className="w-full text-white rounded-xl mt-5 h-[40px] sm:h-[60px] p-4 pr-14 border-2 border-gray-300 shadow-md outline-none resize-none"
                  placeholder="Send a message..."
                />
                <button type="submit">
                  <FaPaperPlane className="absolute mr-[7px] sm:mr-[15px] mt-[10px] right-4 bg-gray-500 p-[10px] rounded-full top-1/2 transform -translate-y-1/2 text-white text-[30px] sm:text-[35px] md:text-[40px] cursor-pointer hover:scale-110 transition-all" />
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default MessageComponent;
