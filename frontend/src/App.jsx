import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Header from "./component/Header.jsx";
import LogIn from "./pages/LogIn.jsx";
import ForgetPassword from "./pages/ForgetPassword.jsx";
import VerifyOTP from "./pages/VerifyOTP.jsx";
import ResetPassword from "./pages/ResetPassword.jsx";


import SignUp from "./pages/SignUp.jsx";
import Home from "./pages/Home.jsx";
import { Toaster } from "react-hot-toast";
import useSocket from "./socketClient/useSocket";

function App() {
  const { loggedInUser } = useSelector((state) => state.user);

  const socket = useSocket();
  
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route
          path="/"
          element={loggedInUser ? <Home /> : <Navigate to="/log-in" />}
        />
       
        <Route path="/sign-up" element={<SignUp />} />
        
        <Route path="/log-in" element={<LogIn />} />
        <Route path="/forget-password" element={<ForgetPassword />} />
        <Route path="/verify-OTP" element={<VerifyOTP />} />
         <Route path="/reset-password" element={<ResetPassword />} />

      </Routes>
      <Toaster />
    </BrowserRouter>
  );
}

export default App;
