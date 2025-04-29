import { createContext, useEffect, useState } from "react";
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

  const loadUserProfileData = async () => {

    try {

        const { data } = await axios.get(backendUrl + '/api/user/get-profile', { headers: { token } })
        if (data.success) {
            setUserData(data.userData)
        } else {
            toast.error(data.message)
        }

    } catch (error) {
        console.log(error)
        toast.error(error.message)
    }
  }

  const logout = () => {
    setToken('')
    setUserData(false)
    localStorage.removeItem('token')
  }

  useEffect(() => {
    getDoctosData();
  }, []);

  useEffect(() => {
    if (token) {
      loadUserProfileData()
    } else {
      setUserData(false)
    }
  }, [token]);

  const value = {
    doctors,
    currencySymbol,
    getDoctosData,
    backendUrl,
    token, setToken,
    userData, setUserData,
    loadUserProfileData,
    logout
  };

  return (
    <AppContext.Provider value={value}>
      {props.children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
