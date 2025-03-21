import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Header from "./component/Header.jsx";
import LogIn from "./pages/LogIn.jsx";
import SignUp from "./pages/SignUp.jsx";
import Home from "./pages/Home.jsx";
import { Toaster } from "react-hot-toast";
import useSocket from "./socketClient/UseSocket";

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
      </Routes>
      <Toaster />
    </BrowserRouter>
  );
}

export default App;
