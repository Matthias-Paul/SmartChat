import profile from "../assets/background.jpg";
import { FaPaperPlane } from "react-icons/fa";
import { TiMessages } from "react-icons/ti"
function MessageComponent() {
  const noChatSelected = true;
  return (
    <>
      {noChatSelected ? (
        <>
          <div className="w-full m-auto  px-[10px] overflow-x-auto h-screen flex justify-center items-center  bg-black  text-white  opacity-[0.5]">
            <div className="m-auto  text-[30px]  text-center flex flex-col ">
              <div> Welcome Adesina Paul </div>
              <div>Select a chat to start messaging </div>
              <TiMessages className=" m-auto text-[70px]   " />
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="w-full flex-1 relative bg-black   text-white  opacity-[0.5]  ">
            <div className=" bg-gray-500 w-full pl-[50px] fixed  text-white p-[15px] gap-x-[10px] text-[24px] ">
              <div className="inline"> To: </div>
              <div className=" text-pink-100 inline "> Adesina Paul </div>
            </div>

            <div className="pt-[80px] flex flex-col    h-screen  overflow-y-auto   mx-[12px] space-y-[40px] ">
              <div className=" flex  flex-col block float-right  ">
                <div className="flex flex-row-reverse gap-x-[5px]  items-center  ">
                  <img
                    className="w-[40px] h-[40px] flex-shrink-0 rounded-[50%] "
                    src={profile}
                  />
                  <div className="bg-gray-800 rounded-md max-w-[280px] lg:max-w-[500px] overflow-wrap w-full p-[4px] word-breaks ">
                    {" "}
                    Hi, How are you doing?{" "}
                  </div>
                </div>

                <div className="float-right flex justify-end  mr-[45px]  ">
                  {" "}
                  20:33 pm{" "}
                </div>
              </div>

              <div className=" flex  flex-col block float-left  ">
                <div className="flex gap-x-[5px]  items-center  ">
                  <img
                    className="w-[40px] h-[40px] flex-shrink-0 rounded-[50%] "
                    src={profile}
                  />
                  <div className="bg-gray-800 rounded-md max-w-[280px] lg:max-w-[500px] overflow-wrap w-full p-[4px] word-breaks ">
                    {" "}
                    Hi, i'm fine. how about you??{" "}
                  </div>
                </div>

                <div className="float-right flex justify-start  ml-[45px]  ">
                  {" "}
                  20:33 pm{" "}
                </div>
              </div>

              <div className=" flex  flex-col block float-right  ">
                <div className="flex flex-row-reverse gap-x-[5px]  items-center  ">
                  <img
                    className="w-[40px] h-[40px] flex-shrink-0 rounded-[50%] "
                    src={profile}
                  />
                  <div className="bg-gray-800 rounded-md max-w-[280px] lg:max-w-[500px] overflow-wrap w-full p-[4px] word-breaks ">
                    {" "}
                    Hi, How are you doing?{" "}
                  </div>
                </div>

                <div className="float-right flex justify-end  mr-[45px]  ">
                  {" "}
                  20:33 pm{" "}
                </div>
              </div>
            </div>

            <div className=" max-w-[998px] w-full  absolute bottom-0  mb-[5px] bg-black  ">
              <form>
                <div className="relative  px-[12px]  ">
                  <input
                    className="w-full  text-white  rounded-xl mt-5 h-[40px] sm:h-[60px] p-4 pr-14 border-2 border-gray-300 shadow-md outline-none resize-none"
                    placeholder="Send a message..."
                  />
                  <button type="submit">
                    <FaPaperPlane className="absolute mr-[7px] sm:mr-[15px] mt-[10px] right-4 bg-gray-500 p-[10px] rounded-full top-1/2 transform -translate-y-1/2 text-white text-[30px] sm:text-[35px] md:text-[40px] cursor-pointer hover:scale-110 transition-all" />
                  </button>
                </div>
              </form>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default MessageComponent;
