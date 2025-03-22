import { IoSearchSharp } from "react-icons/io5";
import { BiLogOut } from "react-icons/bi";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { logOutSuccess, setUsersSuccess, selectedConversationSuccess } from "../redux/userSlice.js";
import { useQuery } from "@tanstack/react-query";
import profile from "../assets/background.jpg";

function SideBar() {
  const dispatch = useDispatch();
  const { users, selectedConversation, loggedInUser } = useSelector((state) => state.user);
  const { onlineUsers } = useSelector((state) => state.socket);

  const [search, setSearch] = useState("");
  const [logOutLoading, setLogOutLoading] = useState(false);
  const [conversations, setConversations] = useState([]);

  const isOnline = onlineUsers.includes(loggedInUser?._id);

  // Fetch users
  const fetchUsers = async () => {
    const res = await fetch("https://smartChat-wtxa.onrender.com/api/users/get-users", {
      method: "GET",
      credentials: "include",
    });
    if (!res.ok) throw new Error("Failed to fetch users");
    return res.json();
  };

  const { data } = useQuery({ queryKey: ["users"], queryFn: fetchUsers });

  useEffect(() => {
    if (data?.users) {
      dispatch(setUsersSuccess(data.users));
    }
  }, [data, dispatch]);

  // Fetch last messages
  const fetchLastMessages = async () => {
    const res = await fetch("https://smartChat-wtxa.onrender.com/api/messages/get-conversations", {
      method: "GET",
      credentials: "include",
    });
    if (!res.ok) throw new Error("Failed to fetch conversations");
    return res.json();
  };

  const { data: lastMsg } = useQuery({ queryKey: ["conversations"], queryFn: fetchLastMessages });

  useEffect(() => {
    if (lastMsg?.conversations) {
      setConversations(lastMsg.conversations);
    }
  }, [lastMsg]);

  console.log(lastMsg)

  // Handle user selection
  const handleSelectedConversation = (user) => {
    dispatch(selectedConversationSuccess(user));
  };

  // Handle search input
  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  // Filter users based on search
  const filteredUsers = users?.filter((user) =>
    user.fullName.toLowerCase().includes(search.toLowerCase())
  );

  // Handle logout
  const handleLogOut = async () => {
    try {
      setLogOutLoading(true);
      const res = await fetch("https://smartChat-wtxa.onrender.com/api/auth/log-out", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to log out");
      }

      setLogOutLoading(false);
      dispatch(logOutSuccess());
      toast.success("Logged out successfully!");
    } catch (error) {
      setLogOutLoading(false);
      toast.error("Something went wrong!");
    }
  };

  return (
    <div className="relative pt-[65px] w-full opacity-[0.5] flex-shrink-0 pb-[20px] bg-black text-white border-r border-gray-500 shadow-md h-screen overflow-hidden">
      {/* Search Bar */}
      <div className="flex items-center absolute w-full bg-black pb-[20px] gap-x-[15px] pt-[20px] px-[12px]">
        <input
          type="text"
          value={search}
          onChange={handleSearch}
          placeholder="Search..."
          className="border border-white p-[10px] focus:outline-none rounded-[20px] w-full"
        />
      </div>

      <div className="h-screen mt-[85px] overflow-y-auto">
        {filteredUsers?.map((user, index) => {
       
          const conversation = conversations?.find((c) => c?.participants?.some((p) => p?._id === user?._id));
          const lastMessage = conversation?.messages?.[0]?.message || "No messages yet";

          return (
            <div
              key={user._id}
              onClick={() => handleSelectedConversation(user)}
              className={`flex flex-col ${
                user._id === selectedConversation?._id ? "bg-blue-400 text-black" : ""
              } ${index === users.length - 1 ? "border-none" : "border-b border-gray-200"}
               pb-[15px] cursor-pointer px-[12px] py-[10px]`}
            >
              <div className="flex items-center">
                <div className="relative h-[50px] w-[40px]">
                  <img
                    className="w-[40px] h-[40px] flex-shrink-0 rounded-full"
                    src={user?.profilePicture || profile}
                    alt="Profile"
                  />
                  {isOnline && onlineUsers.includes(user._id) && (
                    <div className="absolute mt-[-78px] top-[20px] z-100 right-[-4px] text-[60px] text-orange-900">
                      .
                    </div>
                  )}
                </div>
                <div className="flex text-[15px] ml-[10px] flex-col">
                  <div>{user?.fullName}</div>
                  <div className="truncate mt-[-3px] w-[210px] text-gray-400 text-sm">
                    {lastMessage}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Logout Button */}
      <div onClick={handleLogOut} className="absolute bottom-0 right-0">
        <button
          className="mr-[12px] mb-[20px] w-[40px] h-[40px] flex-shrink-0 rounded-full cursor-pointer bg-blue-500"
          disabled={logOutLoading}
        >
          <BiLogOut className="w-[30px] m-auto" />
        </button>
      </div>
    </div>
  );
}

export default SideBar;
