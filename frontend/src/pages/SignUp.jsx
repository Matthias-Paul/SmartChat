import { NavLink } from "react-router-dom";
import { useState } from "react";

function SignUp() {
  const [inputFields, setInputFields] = useState({
    fullName: "",
    username: "",
    password: "",
    confirmPassword: "",
    gender: "",
    email: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(inputFields);
  };

  return (
    <>
      <div className="max-w-[500px] flex py-[50px] px-[30px]  flex-col  m-auto">
        <div className=" opacity-[0.7] w-full m-auto p-[30px] text-start text-white shadow-md rounded-lg bg-gray-400 ">
          <h1 className="  text-[30px] font-[500] inline "> SignUp </h1>
          <span className=" text-[30px] font-[500] text-blue-300 ">
            {" "}
            SmartChat{" "}
          </span>

          <form onSubmit={handleSubmit}>
            <div className="flex text-start flex-col mt-[22px]">
              <label htmlFor="fullName">Enter Full Name</label>
              <input
                type="text"
                id="fullName"
                value={inputFields.fullName}
                onChange={(e) =>
                  setInputFields({ ...inputFields, fullName: e.target.value })
                }
                className="w-full  rounded-lg  focus:outline-blue-500  p-[7px] border  mt-[6px]"
              />
            </div>

            <div className="flex text-start flex-col mt-[22px]">
              <label htmlFor="username">Enter Username</label>
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

            <div className="flex text-start flex-col mt-[22px]">
              <label htmlFor="email">Enter Email</label>
              <input
                type="email"
                id="email"
                value={inputFields.email}
                onChange={(e) =>
                  setInputFields({ ...inputFields, email: e.target.value })
                }
                className="w-full  rounded-lg  focus:outline-blue-500  p-[7px] border  mt-[6px]"
              />
            </div>

            <div className="flex text-start flex-col mt-[12px]">
              <label htmlFor="password">Enter Password</label>
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

            <div className="flex text-start flex-col mt-[12px]">
              <label htmlFor="confirmPassword">Enter Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                value={inputFields.confirmPassword}
                onChange={(e) =>
                  setInputFields({
                    ...inputFields,
                    confirmPassword: e.target.value,
                  })
                }
                className="w-full  rounded-lg  focus:outline-blue-500  p-[7px] border  mt-[6px]"
              />
            </div>

            <div className="mt-[12px] ">
              <h1> Gender </h1>
              <div className="flex gap-x-[30px]  ">
                <div className="flex items-center">
                  <span className="inline"> Male </span>
                  <input
                    type="radio"
                    value="Male"
                    onChange={(e) =>
                      setInputFields({
                        ...inputFields,
                        gender: e.target.value,
                      })
                    }
                    name="gender"
                    className="ml-[4px] cursor-pointer"
                  />
                </div>

                <div className="flex items-center">
                  <span className="inline"> Female </span>
                  <input
                    type="radio"
                    value="Female"
                    onChange={(e) =>
                      setInputFields({
                        ...inputFields,
                        gender: e.target.value,
                      })
                    }
                    name="gender"
                    className="ml-[4px]  cursor-pointer"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              className={`w-full  p-[10px] text-lg rounded-lg font-[500] text-white mt-[30px] cursor-pointer bg-[blue] activ:bg-black"
             `}
            >
              {/* {loading ? "Loging In..." : "Log   In"} */}
              Sign Up
            </button>
            <div className="mt-[5px] text-center text-[15px]">
              <span>Already have an account?</span>
              <NavLink className="text-[blue] ml-[5px]" to="/log-in">
                Log In
              </NavLink>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default SignUp;
