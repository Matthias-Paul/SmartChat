import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import { loggedInSuccess } from "../redux/userSlice.js"
function LogIn() {

  const dispatch = useDispatch()

  const { loggedInUser } = useSelector((state)=> state.user)

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [inputFields, setInputFields] = useState({
   
    username: "",
    password: "",
   
  });
const logInMutation = useMutation({
    mutationFn: async () => {
      setLoading(true);
      const res = await fetch("http://localhost:8000/api/auth/log-in", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          
        },
        body: JSON.stringify(inputFields),
        
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to log in");
      }
      setLoading(false);
      const data = await res.json();
      console.log("Response from backend:", data);

      return data;
    },
    onSuccess: (data) => {
      setInputFields({
     
        username: "",
        password: "",
      
      });

      toast.success("Log in successful! Redirecting to home page...");
      setLoading(false);
      dispatch(loggedInSuccess(data.user))
    
      console.log("user from redux:", loggedInUser)
      setTimeout(() => navigate("/"), 1000);
    },

    onError: (error) => {
      toast.error(error.message);
      setLoading(false);
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
   logInMutation.mutate(inputFields);
  };

  return (
    <>
      <div className="max-w-[500px] flex  px-[30px] h-screen flex-col  m-auto ">
        <div className=" opacity-[0.7] w-full m-auto p-[30px] text-center text-white shadow-md rounded-lg bg-gray-400 ">
          <h1 className="  text-[30px] font-[500] inline "> Login </h1>
          <span className=" text-[30px] font-[500] text-blue-300 ">
            {" "}
            SmartChat{" "}
          </span>

          <form onSubmit={handleSubmit}>
            <div className="flex text-start flex-col mt-[22px]">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                value={inputFields.username}
                onChange={(e) =>
                  setInputFields({ ...inputFields, username: e.target.value })
                }
                className="w-full  rounded-lg  focus:outline-blue-500  p-[7px] border  mt-[6px]"
              />
            </div>

            <div className="flex text-start flex-col mt-[12px]">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={inputFields.password}
                onChange={(e) =>
                  setInputFields({ ...inputFields, password: e.target.value })
                }
                className="w-full  rounded-lg  focus:outline-blue-500  p-[7px] border  mt-[6px]"
              />
            </div>
              <div className="mt-[5px] text-start text-[15px]">
              <span>Forget Password?</span>
              <NavLink className="text-[blue] ml-[5px]" to="/forget-password">

              Recover Now
              </NavLink>

            </div>

            <button
              type="submit"
              className={`w-full  p-[10px] text-lg rounded-lg font-[500] text-white mt-[30px] cursor-pointer bg-[blue] activ:bg-black"
             `}
            >
              { loading ? "Logging In..." : "Log   In"}
           
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
