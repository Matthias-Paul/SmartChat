import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import SideBar from "../component/SideBar";
import MessageComponent from "../component/MessageComponent";
import { selectedConversationSuccess } from "../redux/userSlice.js";

function Home() {
  const { selectedConversation } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!selectedConversation) {
      navigate("/");     }
  }, [selectedConversation, navigate]);

  return (
    <div className="max-w-[1400px] mx-auto flex h-screen rounded-lg">
      {/* Sidebar: Always visible on md+ screens, only visible on sm when no conversation is selected */}
      <div className={`w-full md:max-w-[400px] ${selectedConversation ? "hidden md:flex" : "flex"}`}>
        <SideBar />
      </div>

      {/* Message Component: Hidden on small screens unless a conversation is selected */}
      <div className={`w-screen md:flex-grow ${selectedConversation ? "flex" : "hidden md:flex"}`}>
        <MessageComponent />
      </div>
    </div>
  );
}

export default Home;
