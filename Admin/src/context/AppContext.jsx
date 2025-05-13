import { createContext } from "react";

export const AppContext = createContext()

const AppContextProvider = (props) => {

    const currency = '$'
    const months = ["", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

    const slotDateFormat = (slotDate) => {
        const parts = slotDate.split('_')
        return `${parts[0]} ${months[Number(parts[1])]} ${parts[2]}`
    }

    const calculateAge = (dob) => {
        if (!dob || dob === 'Not Selected') return '-'
        const today = new Date()
        const birthDate = new Date(dob)
        return today.getFullYear() - birthDate.getFullYear()
    }

    const value = {
        currency,
        slotDateFormat,
        calculateAge
    }

    return (
        <AppContext.Provider value = {value}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider
