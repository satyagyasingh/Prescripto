import { useContext, useState } from "react";
import Login from "./pages/login.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AdminContext } from "./context/AdminContext.jsx";
import Navbar from './components/Navbar.jsx';
import SideBar from "./components/SideBar.jsx";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Admin/DashBoard.jsx";
import AllAppointments from './pages/Admin/AllAppointments';
import AddDoctor from './pages/Admin/AddDoctor';
import DoctorsList from "./pages/Admin/DoctorsList.jsx";

function App() {
  const { aToken } = useContext(AdminContext);

  return aToken ? (
    <div>
      <ToastContainer />
      <Navbar/>
      <div className="flex items-start">
        <SideBar/>
        <Routes>
        <Route path='/' element={<></>} />
          <Route path='/admin-dashboard' element={<Dashboard/>} />
          <Route path='/all-appointments' element={<AllAppointments/>} />
          <Route path='/add-doctor' element={<AddDoctor/>} />
          <Route path='/doctor-list' element={<DoctorsList/>} />
        </Routes>
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
