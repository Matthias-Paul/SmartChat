import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import SideBar from "../component/SideBar";
import MessageComponent from "../component/MessageComponent";
import { useLocation, useNavigate } from "react-router-dom";
import { selectedConversationSuccess } from "../redux/userSlice.js";

function Home() {
  const { selectedConversation } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleBackButton = () => {
      if (location.pathname === "/") {
        dispatch(selectedConversationSuccess(null));
      }
    };

    window.addEventListener("popstate", handleBackButton);
    return () => {
      window.removeEventListener("popstate", handleBackButton);
    };
  }, [location, navigate, dispatch]);

  return (
    <div className="max-w-[1400px] mx-auto flex h-screen rounded-lg">
      {/* Sidebar: Always visible on large screens, conditionally visible on small screens */}
      <div
        className={`w-full md:max-w-[400px] ${
          selectedConversation ? "hidden sm:flex" : "flex"
        }`}
      >
        <SideBar />
      </div>

      {/* Message Component: Hidden on small screens unless a conversation is selected */}
      <div
        className={`w-full md:flex ${
          selectedConversation ? "flex" : "hidden"
        }`}
      >
        <MessageComponent />
      </div>
    </div>
  );
}

export default Home;
