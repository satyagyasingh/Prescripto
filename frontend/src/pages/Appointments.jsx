import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets";

const Appointments = () => {
  const { docId } = useParams();
  const { doctors , currencySymbol } = useContext(AppContext);
  const [docInfo, setDocInfo] = useState(null);

  const [docSlots , setDocSlots] = useState([])
  const [slotIndex, setSlotIndex] = useState(0)
  const [slotTime, setSlotTime] = useState('')

  const getAvailableSlot = async () => {
    // Clear previous slots
    let allSlots = [];
    
    let today = new Date();
    for (let i = 0; i < 7; i++) {
      let currDate = new Date(today);
      currDate.setDate(today.getDate() + i);
  
      let endTime = new Date(currDate);
      endTime.setHours(21, 0, 0, 0);
  
      // Setting hours
      if (today.getDate() === currDate.getDate()) {
        currDate.setHours(currDate.getHours() > 10 ? currDate.getHours() + 1 : 10);
        currDate.setMinutes(currDate.getMinutes() > 30 ? 30 : 0);
      } else {
        currDate.setHours(10);
        currDate.setMinutes(0);
      }
  
      let timeSlots = [];
      while (currDate < endTime) {
        let formattedTime = currDate.toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        });
  
        // Add slot to array
        timeSlots.push({
          dateTime: new Date(currDate),
          time: formattedTime,
        });
  
        // Increment time by 30 minutes
        currDate.setMinutes(currDate.getMinutes() + 30);
      }
  
      // Add the generated slots for the current day to the main array
      allSlots.push(...timeSlots);
    }
  
    setDocSlots(allSlots);
  };
  
  useEffect(() => {
    if (docInfo) {
      getAvailableSlot();
    }
  }, [docInfo]);
  
 
  const fetchDocInfo = async () => {
    const docInfoLocal = doctors.find((doc) => doc._id === docId);
    setDocInfo(docInfoLocal);
  };

  useEffect(()=>{
    getAvailableSlot()
  },[docInfo]) 

  useEffect(()=>{
    console.log(docSlots)
  },[docSlots])

  useEffect(() => {
    fetchDocInfo();
  }, [doctors, docId]);
  return (
    docInfo && (
      <div>
        {/* doctor details */}
        <div className=" flex flex-col sm:flex-row gap-4">
          <div>
            <img className='bg-primary w-full sm:max-w-74 rounded-lg' src={docInfo.image} alt="" />
          </div>
          <div className='flex flex-col border border-gray-400 rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0'>
            {/* dov ifo :name degree and exprience*/}
            <p className='flex items-center gap-2 text-2xl font-medium text-gray-600'> 
              {docInfo.name}
              <img className="w-5" src={assets.verified_icon} alt="" />
            </p>
            <div className="flex items-center gap-2 text-sm mt-1 text-gray-600">
              <p>
                {docInfo.degree} - {docInfo.speciality}
              </p>
              <button className="py-0.5 px-2 border text-xs rounded-full">{docInfo.experience}</button>
            </div>

            {/* about doctor */}
            <div>
              <p className="flex items-center gap-1 text-sm font-medium text-gray-900 mt-3">
                About <img src={assets.info_icon} alt="" />
              </p>
              <p className="text-sm text-gray-500 max-w-[800px] mt-1">{docInfo.about}</p>
            </div>

            <p>Appointment Fee : <span>{currencySymbol} {docInfo.fees}</span></p>
          </div>
        </div>
      </div>
    )
  );
};

export default Appointments;
