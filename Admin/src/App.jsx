import { useContext, useState } from "react";
import Login from "./pages/login.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AdminContext } from "./context/AdminContext.jsx";
import Navbar from './components/Navbar.jsx';
import SideBar from "./components/SideBar.jsx";

function App() {
  const { aToken } = useContext(AdminContext);

  return aToken ? (
    <div>
      <ToastContainer />
      <Navbar/>
      <div className="flex items-start">
        <SideBar/>
      </div>
    </div>
  ) : (
    <div>
      <Login />
      <ToastContainer />
    </div>

  );
}

export default App;
