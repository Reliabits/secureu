import Home from "./components/Home/Home";
import { Routes, Route } from "react-router-dom";
import Login from "./components/login/Login";
import Signup from "./components/login/Signup";
import Verification from "./components/login/Verification";
import Newpassword from "./components/login/Newpassword";
import MainDashboard from "./components/dashboard/mainDashboard";
function App() {
  return (
    <>
      <div className="container-fluid">
        <Routes>
          <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/verification" element={<Verification />} />
            <Route path="/newpassword" element={<Newpassword />} />
            <Route path="/mainDashboard" element={<MainDashboard />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
