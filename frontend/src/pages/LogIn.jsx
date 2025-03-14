import { NavLink } from "react-router-dom";

function LogIn() {
  return (
    <>
      <div className="max-w-[500px] flex my-[10px] px-[30px] h-screen flex-col  m-auto ">
        <div className=" opacity-[0.7] w-full m-auto p-[30px] text-start text-white shadow-md rounded-lg bg-gray-400 ">
          <h1 className="  text-[30px] font-[500] inline "> Login </h1>
          <span className=" text-[30px] font-[500] text-blue-300 ">
            {" "}
            SmartChat{" "}
          </span>

          <form>
            <div className="flex text-start flex-col mt-[22px]">
              <label htmlFor="username">Enter Your Username</label>
              <input
                type="text"
                id="username"
                className="w-full  rounded-lg  focus:outline-blue-500  p-[7px] border  mt-[6px]"
              />
            </div>

            <div className="flex text-start flex-col mt-[12px]">
              <label htmlFor="password">Enter Your Password</label>
              <input
                type="password"
                id="password"
                className="w-full  rounded-lg  focus:outline-blue-500  p-[7px] border  mt-[6px]"
              />
            </div>

            <button
              type="submit"
              className={`w-full  p-[10px] text-lg rounded-lg font-[500] text-white mt-[30px] cursor-pointer bg-[blue] activ:bg-black"
             `}
            >
              {/* {loading ? "Loging In..." : "Log   In"} */}
              Log In
            </button>
            <div className="mt-[5px] text-center text-[15px]">
              <span>Don&#39;t have an account?</span>
              <NavLink className="text-[blue] ml-[5px]" to="/sign-up">

              Sign up
              </NavLink>

            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default LogIn;
