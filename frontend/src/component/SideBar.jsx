import { IoSearchSharp } from "react-icons/io5";
import { BiLogOut } from "react-icons/bi";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { logOutSuccess } from "../redux/userSlice.js";
import { useQuery } from "@tanstack/react-query";
import { setUsersSuccess } from "../redux/userSlice.js"

import profile from "../assets/background.jpg";

function SideBar() {
  const dispatch = useDispatch();
  const { users } = useSelector((state)=> state.user)
// https://smartChat-wtxa.onrender.com
  const [logOutLoading, setLogOutLoading] = useState(false);

  const handleLogOut = async () => {
    try {
      setLogOutLoading(true);
      const res = await fetch("http://localhost:8000/api/auth/log-out", {
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
    const res = await fetch("http://localhost:8000/api/users/get-users", {
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

  return (
    <div className="relative w-[340px] lg:w-[400px] flex-shrink-0 pb-[20px] bg-black text-white border-r-[1px] border-gray-500 shadow-md h-screen overflow-hidden opacity-[0.5]">
      <div className="flex items-center absolute w-full bg-black pb-[20px] gap-x-[15px] pt-[20px] px-[12px]">
        <input
          type="text"
          placeholder="Search..."
          className="border border-white p-[10px] focus:outline-none rounded-[20px] w-full"
        />
        <button className="w-[40px] h-[40px] flex-shrink-0 rounded-[50%] cursor-pointer bg-blue-500">
          <IoSearchSharp className="w-[30px] m-auto" />
        </button>
      </div>

      <div className="h-screen mt-[85px] overflow-y-auto">
        {users?.map((user) => (
          <div
            key={user._id}
            className="flex flex-col border-b-[0.5px] border-gray-200 pb-[15px] mt-[20px] cursor-pointer mx-[12px] py-[10px]"
          >
            <div className="flex items-center">
              <img
                className="w-[40px] h-[40px] flex-shrink-0 rounded-[50%]"
                src={user?.profilePicture || profile}
                alt="Profile"
              />
              <div className="flex text-[15px] ml-[10px] flex-col">
                <div>{user?.username}</div>
                <div className="truncate mt-[-3px] w-[210px]">
                  last message sent
                </div>
              </div>
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
