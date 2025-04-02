import { createContext, useEffect, useState } from "react";
// import { doctors } from "../assets/assets";
import { toast } from "react-toastify";
import axios from 'axios'


export const AppContext = createContext();

const AppContextProvider = (props) => {
  const currencySymbol = '$'
  const backendUrl = import.meta.env.VITE_BACKEND_URL

  const [doctors, setDoctors] = useState([])
  const [token, setToken] = useState(localStorage.getItem('token') ? localStorage.getItem('token') : '')
  const [userData, setUserData] = useState(false)

  const getDoctosData = async () => {

    try {

        const { data } = await axios.get(backendUrl + '/api/doctor/list')
        console.log("Data that we got : " + data);
        if (data.success) {
            setDoctors(data.doctors)
        } else {
            toast.error(data.message)
        }

    } catch (error) {
        console.log(error)
        toast.error(error.message)
    }
}
useEffect(() => {
  getDoctosData();
}, []);

  const value = {
    doctors,
    currencySymbol,
    getDoctosData
  };

  return (
    <AppContext.Provider value={value}>
      {props.children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
