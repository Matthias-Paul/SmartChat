import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";

function VerifyOTP() {
  const [otp, setOtp] = useState("")
    const [loading, setLoading] = useState(false);

   const navigate = useNavigate()

    const verifyOTPMutation = useMutation({
      mutationFn: async()=>{
              setLoading(true);

      const res = await fetch(`https://smartchat-wtxa.onrender.com/api/password/verify-OTP?otp=${otp}`, {
          method: "GET",
        
        })
        if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to verify OTP");
        }
              setLoading(false);

      const data = await res.json();
      console.log("Response from backend:", data);

      return data;

      },
      onSuccess:(data)=>{
        setOtp("")
              setLoading(false);

        toast.success(data.message)
         setTimeout(() => navigate("/reset-password"), 1000);

      },
      onError: (error)=>{
        console.log(error.message)
        toast.error(error.message)
      setLoading(false);

      }
    })


  const handleSubmit = async(e)=>{
    e.preventDefault()
    verifyOTPMutation.mutate()
  }

  return (
    <>
      <div className="max-w-[500px] flex  px-[30px] h-screen flex-col  m-auto ">
        <div className=" opacity-[0.7] w-full m-auto p-[30px] text-center text-white shadow-md rounded-lg bg-gray-400 ">
          <span className=" text-[30px] font-[500] text-blue-300 ">
            {" "}
            SmartChat{" "}
          </span>
          <h1 className="  text-[30px] font-[500] "> Verify OTP </h1>
         <form onSubmit={handleSubmit} >
            <div className="flex text-start flex-col mt-[22px]">
              <label htmlFor="otp">Enter OTP</label>
              <input
                type="text"
                id="otp"
                value={otp}
                onChange={(e)=> setOtp(e.target.value)}
                className="w-full  rounded-lg  focus:outline-blue-500  p-[7px] border  mt-[6px]"
              />
            </div>

          
            <button
              type="submit"
              className={`w-full  p-[10px] text-lg rounded-lg font-[500] text-white mt-[30px] cursor-pointer bg-[blue] activ:bg-black"
             `}
            >
                            { loading ? "Verifying ..." : "Verify OTP"}

           
            </button>
            
          </form>
        </div>
      </div>
    </>
  )
}

export default VerifyOTP
