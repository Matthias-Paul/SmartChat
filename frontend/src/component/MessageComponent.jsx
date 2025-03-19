import profile from "../assets/background.jpg";
import { FaPaperPlane } from "react-icons/fa";
import { TiMessages } from "react-icons/ti";
import { useDispatch, useSelector } from "react-redux";
import {
  selectedConversationSuccess,
  setMessagesSuccess
} from "../redux/userSlice.js";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useMutation, useQuery, useQueryClient  } from "@tanstack/react-query";

function MessageComponent() {

const queryClient = useQueryClient();
  
  const [sendMessage, setSendMessage] = useState("");
  const { loggedInUser, selectedConversation, messages } = useSelector(
    (state) => state.user
  );

  const dispatch = useDispatch();

  const handleBack = () => {
    dispatch(selectedConversationSuccess(null));
  };

  useEffect(() => {
    return () => dispatch(selectedConversationSuccess(null));
  }, [dispatch]);

  const sendMessageMutation = useMutation({
    mutationFn: async () => {
      if (!selectedConversation?._id) {
        throw new Error("No conversation selected.");
      }
      const res = await fetch(
        `http://localhost:8000/api/messages/send-message/${selectedConversation?._id}`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ message:sendMessage }),
        }
      );

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to send a message");
      }

      return res.json();
    },
    onSuccess: (data) => {
      setSendMessage("");
       queryClient.invalidateQueries(["conversation", selectedConversation?._id]);
      dispatch(setMessagesSuccess([...messages, data]));
      toast.success("Sent");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const { data } = useQuery({
    queryKey: ["conversation", selectedConversation?._id],
    queryFn: async () => {
       if (!selectedConversation?._id) return null; 
      const res = await fetch(
        `http://localhost:8000/api/messages/get-message/${selectedConversation._id}`,
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
    }
  }, [data, dispatch]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!sendMessage.trim()) return;
    sendMessageMutation.mutate(sendMessage);
  };

  return (
    <>
      {!selectedConversation ? (
        <div className="w-full m-auto px-[10px] overflow-x-auto h-screen flex justify-center items-center bg-black text-white opacity-[0.5]">
          <div className="m-auto text-[30px] text-center flex flex-col">
            <div> Welcome {loggedInUser?.username} </div>
            <div>Select a chat to start messaging </div>
            <TiMessages className="m-auto text-[70px]" />
          </div>
        </div>
      ) : (
        <div className="flex-1 max-w-[1000px] relative bg-black text-white opacity-[0.5]">
          <div className="bg-gray-500 w-full pl-[10px] absolute flex justify-between text-white p-[15px] gap-x-[10px] text-[24px]">
            <div
              onClick={handleBack}
              className="inline text-[20px] cursor-pointer"
            >
              &#8592; Back
            </div>
            <div className="text-pink-100">
              {selectedConversation?.fullName}
            </div>
          </div>

          <div className="pt-[80px] flex flex-col h-screen overflow-y-auto px-[12px] pb-[90px] space-y-[20px]">
            {messages?.length > 0 ? (
              messages.map((msg) => (
                <div
                  key={msg._id}
                  className={`flex w-full flex-col `}
                >
                  <div className={`flex ${msg?.senderId === loggedInUser?._id ? "flex-row-reverse":"" } gap-x-[5px] items-center`}>
                    <img
                      className="w-[40px] h-[40px] flex-shrink-0 rounded-[50%]"
                      src={selectedConversation?.profilePicture || profile}
                      alt="Profile"
                    />
                    <div className="bg-gray-800 rounded-md  overflow-wrap max-w-[500px]  p-[6px]">
                      {msg?.message}
                    </div>
                  </div>

                  <div className={`float-right ${ msg?.senderId === loggedInUser?._id ? "":"flex-row-reverse ml-[45px] "  } flex justify-end mr-[45px] text-gray-400 text-sm`}>
                    {msg?.createdAt
                      ? new Date(msg.createdAt).toLocaleTimeString()
                      : ""}
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center text-gray-400">No messages yet</div>
            )}
          </div>

          <div className="max-w-[998px] w-full absolute bottom-0 mb-[1px] bg-black">
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
