import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import {  useSelector } from "react-redux";

import LogIn from "./pages/LogIn.jsx";
import SignUp from "./pages/SignUp.jsx";
import Home from "./pages/Home.jsx";
import {Toaster} from "react-hot-toast"


function App() {
  const { loggedInUser } = useSelector((state)=> state.user)


  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={ loggedInUser? < Home />  : < Navigate to="/log-in" /> }  />

          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/log-in" element={    <LogIn />} />
        </Routes>
        <Toaster />
      </BrowserRouter>
    </>
  );
}

export default App;
