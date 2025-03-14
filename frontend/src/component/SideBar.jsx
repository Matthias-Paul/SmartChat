import { IoSearchSharp } from "react-icons/io5";
import { BiLogOut } from "react-icons/bi";

import profile from "../assets/background.jpg";

function SideBar() {
  return (
    <div className="relative w-[340px] lg:w-[400px] flex-shrink-0 pb-[20px]  bg-black  text-white  border-r-[1px] border-gray-500  shadow-md h-screen overflow-hidden  opacity-[0.5] ">
      <div className=" flex items-center absolute w-full  bg-black  pb-[20px] gap-x-[15px] pt-[20px] px-[12px] ">
        <input
          type="text"
          placeholder="Search..."
          className="border border-white p-[10px] focus:outline-none rounded-[20px] w-full "
        />
        <button className=" w-[40px] h-[40px] flex-shrink-0 rounded-[50%] cursor-pointer bg-blue-500 ">
          {" "}
          <IoSearchSharp className="w-[30px] m-auto   " />{" "}
        </button>
      </div>

      <div className="h-screen overflow-y-auto ">
        <div className="flex flex-col mt-[85px]   border-b-[0.5px]  border-gray-200 pb-[15px] mt-[20px] cursor-pointer  mx-[12px]  py-[10px]  ">
          <div className="flex  items-center">
            <img
              className="   w-[40px] h-[40px] flex-shrink-0 rounded-[50%] "
              src={profile}
            />
            <div className="flex text-[15px] ml-[10px] flex-col">
              <div> John Doe </div>
              <div className="truncate mt-[-3px] w-[210px]  ">
                {" "}
                last message sent{" "}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-auto  flex right-0  absolute bottom-0 ">
        <button className="mr-[12px] mb-[20px] w-[40px] h-[40px] flex-shrink-0 rounded-[50%] cursor-pointer bg-blue-500 ">
          {" "}
          <BiLogOut className="w-[30px] m-auto   " />{" "}
        </button>
      </div>
    </div>
  );
}

export default SideBar;
