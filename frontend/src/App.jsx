import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from './pages/Home';
import Doctors from './pages/Doctors';
import Login from './pages/Login'; // Ensure this component exists
import About from './pages/About'; // Ensure this component exists
import Contact from './pages/Contact'; // Ensure this component exists
import MyProfile from './pages/MyProfile'; // Ensure this component exists
import MyAppointments from './pages/MyAppointments'; // Ensure this component exists
import Appointments from './pages/Appointments'; // Ensure this component exists
import Navbar from './components/Navbar';
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <div className='mx-10 sm:mx-[10%]'>
        <ToastContainer/>
        <Navbar/>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/doctors' element={<Doctors />} />
          <Route path='/doctors/:speciality' element={<Doctors />} />
          <Route path='/login' element={<Login />} />
          <Route path='/about' element={<About />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/my-profile' element={<MyProfile />} />
          <Route path='/my-appointments' element={<MyAppointments />} />
          <Route path='/appointments/:docId' element={<Appointments />} />
        </Routes>
        <Footer/>
      </div>
    </>
  );
}

export default App;
