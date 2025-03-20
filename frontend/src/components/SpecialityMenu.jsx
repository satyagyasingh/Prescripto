import React from 'react'
import { specialityData } from '../assets/assets'
import { Link } from 'react-router-dom'

const SpecialityMenu = () => {
  return (
    <div id='speciality' className='mt-16 flex flex-col items-center gap-4 text-gray-800 '>
      <h1 className='text-3xl font-medium'>Find by Speciality</h1>
      <p className='sm:w-1/3 text-center text-small'>Simply browse through our extensive list of trusted doctor, schedule your appointment hastle free </p>
      <div className='flex sm:justify-center gap-4 pt-5 w-full overflow-scroll'>
        {specialityData.map((item,index)=>(
          <Link onClick={()=>scrollTo(10,10)} key={index} to={`/doctors/${item.speciality}`}className='flex flex-col itme-center text-xs cursor-pointer flex-shrink-0 hover:-translate-y-2 transition-all duration-500'>
            <img  src={item.image} className='w-16 sm:w-24 mb-2' alt="" />
            <p >{item.speciality}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}
    

export default SpecialityMenu
