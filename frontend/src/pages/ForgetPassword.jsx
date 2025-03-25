import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import { useDispatch} from "react-redux";
import {  setEmailForForgotPasssword } from "../redux/userSlice.js";

function ForgetPassword() {
  const [email, setEmail] = useState("")
    const [loading, setLoading] = useState(false);
  const dispatch = useDispatch()
   const navigate = useNavigate()

    const generateOTPMutation = useMutation({
      mutationFn: async()=>{
              setLoading(true);

        const res = await fetch("https://smartChat-wtxa.onrender.com/api/password/generate-OTP",{
          method: "POST",
          headers:{
            "Content-Type":"application/json"
          },
          body: JSON.stringify({email})
        })
        if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to generate OTP");
        }
              setLoading(false);

      const data = await res.json();
      console.log("Response from backend:", data);

      return data;

      },
      onSuccess:(data)=>{
        setEmail("")
        setLoading(false);
        dispatch(setEmailForForgotPasssword(email))
        toast.success(data.message)
         setTimeout(() => navigate("/verify-OTP"), 1000);

      },
      onError: (error)=>{
        console.log(error.message)
        toast.error(error.message)
      setLoading(false);

      }
    })


  const handleSubmit = async(e)=>{
    e.preventDefault()
    generateOTPMutation.mutate()
  }

  return (
    <>
      <div className="max-w-[500px] flex  px-[30px] h-screen flex-col  m-auto ">
        <div className=" opacity-[0.7] w-full m-auto p-[30px] text-center text-white shadow-md rounded-lg bg-gray-400 ">
          <span className=" text-[30px] font-[500] text-blue-300 ">
            {" "}
            SmartChat{" "}
          </span>
          <h1 className="  text-[30px] font-[500] "> Forget Password </h1>
         <form onSubmit={handleSubmit} >
            <div className="flex text-start flex-col mt-[22px]">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e)=> setEmail(e.target.value)}
                className="w-full  rounded-lg  focus:outline-blue-500  p-[7px] border  mt-[6px]"
              />
            </div>

          
            <button
              type="submit"
              className={`w-full  p-[10px] text-lg rounded-lg font-[500] text-white mt-[30px] cursor-pointer bg-[blue] activ:bg-black"
             `}
            >
                            { loading ? "Requesting ..." : "Request OTP"}

           
            </button>
            
          </form>
        </div>
      </div>
    </>
  )
}

export default ForgetPassword
