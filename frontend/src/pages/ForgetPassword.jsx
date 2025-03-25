
function ForgetPassword() {
  return (
    <>
      <div className="max-w-[500px] flex  px-[30px] h-screen flex-col  m-auto ">
        <div className=" opacity-[0.7] w-full m-auto p-[30px] text-center text-white shadow-md rounded-lg bg-gray-400 ">
          <h1 className="  text-[30px] font-[500] inline "> Forget Password </h1>
          <span className=" text-[30px] font-[500] text-blue-300 ">
            {" "}
            SmartChat{" "}
          </span>

          <form >
            <div className="flex text-start flex-col mt-[22px]">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
              
                className="w-full  rounded-lg  focus:outline-blue-500  p-[7px] border  mt-[6px]"
              />
            </div>

          
            <button
              type="submit"
              className={`w-full  p-[10px] text-lg rounded-lg font-[500] text-white mt-[30px] cursor-pointer bg-[blue] activ:bg-black"
             `}
            >
              Recover
           
            </button>
            
          </form>
        </div>
      </div>
    </>
  )
}

export default ForgetPassword
