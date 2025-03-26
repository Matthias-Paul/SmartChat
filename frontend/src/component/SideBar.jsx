import { IoSearchSharp } from "react-icons/io5";
import { BiLogOut } from "react-icons/bi";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { logOutSuccess } from "../redux/userSlice.js";
import { useQuery } from "@tanstack/react-query";
import {useNavigate} from "react-router-dom"
import { setUsersSuccess, selectedConversationSuccess } from "../redux/userSlice.js"

import profile from "../assets/background.jpg";

function SideBar() {

  const dispatch = useDispatch();
  const navigate = useNavigate()
  const { users, selectedConversation, loggedInUser} = useSelector((state)=> state.user)
    const { onlineUsers } = useSelector((state) => state.socket);
    const isOnline = onlineUsers.includes(loggedInUser?._id)
    console.log(loggedInUser._id, onlineUsers )
    console.log(isOnline)
  const [search, setSearch] = useState("")
  const [logOutLoading, setLogOutLoading] = useState(false);
  const handleLogOut = async () => {
    try {
      setLogOutLoading(true);
      const res = await fetch("https://smartChat-wtxa.onrender.com/api/auth/log-out", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to log out");
      }

      setLogOutLoading(false);
      dispatch(logOutSuccess());
      toast.success("Log out successfully!");
    } catch (error) {
      console.log(error.message);
      setLogOutLoading(false);
      toast.error("Something went wrong!");
    }
  };

  const fetchMessages = async () => {
    const res = await fetch("https://smartChat-wtxa.onrender.com/api/users/get-users", {
      method: "GET",
      credentials: "include",
    });
    if (!res.ok) {
      throw new Error("Failed to fetch users");
    }
    return res.json();
  };

  const { data } = useQuery({
    queryKey: ["users"],
    queryFn: fetchMessages,
  });

  useEffect(() => {
    if (data) {
      dispatch(setUsersSuccess(data.users))  
      console.log("Users:", users);
    }
  }, [data]);


    const handleSelectedConversation = (user) =>{

      dispatch(selectedConversationSuccess(user))
     
    }
     
const handleSearch = (e) => {
  const query = e.target.value;
  setSearch(query);



  
};
   const filteredUsers = users?.filter((user) =>
    user.fullName.toLowerCase().includes(search.toLowerCase())
  );

  // if(filteredUsers.length === 0){
  //   toast.error("No such user found!")
  // }
  return (
    <div className="relative pt-[65px]  w-full flex-shrink-0 pb-[20px] bg-black text-white border-r-[1px] border-gray-500 shadow-md h-screen overflow-hidden opacity-[0.5]">
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
        {filteredUsers?.map((user, index) => (
          <div
            key={user?._id}
            onClick={() => handleSelectedConversation(user)}
            className={`flex  font-[500] flex-col ${
              user?._id === selectedConversation?._id
                ? "bg-blue-400  text-black "
                : ""
            } ${
              index === users.length - 1 ? "border-none" : "border-b-[0.5px]"
            }  border-gray-200 pb-[15px]  cursor-pointer px-[12px] py-[10px]`}
          >
            <div className="flex justify-between items-center">
             <div className=" flex items-center   " >
               <img
                className="w-[40px]  h-[40px] flex-shrink-0 rounded-[50%]"
                src={user?.profilePicture || profile}
                alt="Profile"
              />
              <div className="flex text-[18px] ml-[6px] flex-col">
                <div>{user?.fullName}</div>
                
              </div>
              </div>
            
                   {
                isOnline && onlineUsers.includes(user._id)  ?  (
                  <div className="text-[16px] sm:text-[20px] text-orange-900" >Online </div>

                ): ( 
                  <div className="text-[16px] sm:text-[20px] text-green-900" > Offline </div>

                )
              }
            </div>
           
          </div>
        ))}
      </div>




      <div
        onClick={handleLogOut}
        className="mt-auto flex right-0 absolute bottom-0"
      >
        <button
          className="mr-[12px] mb-[20px] w-[40px] h-[40px] flex-shrink-0 rounded-[50%] cursor-pointer bg-blue-500"
          disabled={logOutLoading}
        >
          <BiLogOut className="w-[30px] m-auto" />
        </button>
      </div>
    </div>
  );
}

export default SideBar;
