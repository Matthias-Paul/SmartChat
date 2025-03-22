import { useSelector } from "react-redux";
import SideBar from "../component/SideBar";
import MessageComponent from "../component/MessageComponent";

function Home() {
  const { selectedConversation } = useSelector((state) => state.user);

  return (
    <div className="max-w-[1400px] mx-auto flex h-screen rounded-lg">
      {/* Sidebar: Always visible on large screens, conditionally visible on small screens */}
      <div className={`w-full md:max-w-[400px] ${selectedConversation ? "hidden md:flex" : "flex"}`}>
        <SideBar />
      </div>

      {/* Message Component: Hidden on small screens unless a conversation is selected */}
      <div className={`w-screen md:full ${selectedConversation ? "flex" : "hidden md:flex"}`}>
        <MessageComponent />
      </div>
    </div>
  );
}

export default Home;
