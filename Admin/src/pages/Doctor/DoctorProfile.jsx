import React, { useContext, useEffect, useState } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { AppContext } from '../../context/AppContext'

const DoctorProfile = () => {

  const { dToken, profileData, setProfileData, getProfileData, updateProfile } = useContext(DoctorContext)
  const { currency } = useContext(AppContext)
  const [isEdit, setIsEdit] = useState(false)

  const saveProfile = async () => {
    const saved = await updateProfile({
      fee: profileData.fee,
      address: profileData.address,
      available: profileData.available,
      about: profileData.about
    })
    if (saved) {
      setIsEdit(false)
    }
  }

  useEffect(() => {
    if (dToken) {
      getProfileData()
    }
  }, [dToken])

  return profileData && (
    <div className='m-5'>
      <div className='flex flex-col gap-4 sm:flex-row'>

        <div>
          <img className='bg-primary/80 w-full sm:max-w-64 rounded-lg' src={profileData.image} alt="" />
        </div>

        <div className='flex-1 border border-stone-100 rounded-lg p-8 py-7 bg-white'>

          <p className='flex items-center gap-2 text-3xl font-medium text-gray-700'>{profileData.name}</p>
          <div className='flex items-center gap-2 mt-1 text-gray-600'>
            <p>{profileData.degree} - {profileData.speciality}</p>
            <button className='py-0.5 px-2 border text-xs rounded-full'>{profileData.experience}</button>
          </div>

          <div>
            <p className='flex items-center gap-1 text-sm font-medium text-neutral-800 mt-3'>About :</p>
            {isEdit
              ? <textarea onChange={(e) => setProfileData(prev => ({ ...prev, about: e.target.value }))} className='w-full outline-primary p-2 border rounded mt-1' rows={6} value={profileData.about} />
              : <p className='text-sm text-gray-600 max-w-[700px] mt-1'>{profileData.about}</p>
            }
          </div>

          <p className='text-gray-600 font-medium mt-4'>
            Appointment fee : <span className='text-gray-800'>{currency}
              {isEdit
                ? <input type="number" className='border rounded px-2 w-24 ml-1' onChange={(e) => setProfileData(prev => ({ ...prev, fee: Number(e.target.value) }))} value={profileData.fee} />
                : profileData.fee}
            </span>
          </p>

          <div className='flex gap-2 py-2'>
            <p>Address:</p>
            <p className='text-sm'>
              {isEdit
                ? <input type="text" className='border rounded px-2' onChange={(e) => setProfileData(prev => ({ ...prev, address: { ...prev.address, line1: e.target.value } }))} value={profileData.address.line1} />
                : profileData.address.line1}
              <br />
              {isEdit
                ? <input type="text" className='border rounded px-2 mt-1' onChange={(e) => setProfileData(prev => ({ ...prev, address: { ...prev.address, line2: e.target.value } }))} value={profileData.address.line2} />
                : profileData.address.line2}
            </p>
          </div>

          <div className='flex gap-1 pt-2'>
            <input type="checkbox" onChange={() => isEdit && setProfileData(prev => ({ ...prev, available: !prev.available }))} checked={profileData.available} />
            <label>Available</label>
          </div>

          {isEdit
            ? <button onClick={saveProfile} className='px-4 py-1 border border-primary text-sm rounded-full mt-5 hover:bg-primary hover:text-white transition-all'>Save</button>
            : <button onClick={() => setIsEdit(true)} className='px-4 py-1 border border-primary text-sm rounded-full mt-5 hover:bg-primary hover:text-white transition-all'>Edit</button>
          }

        </div>
      </div>
    </div>
  )
}

export default DoctorProfile
