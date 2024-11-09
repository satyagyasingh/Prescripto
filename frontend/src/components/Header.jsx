import React from 'react'
import { assets } from '../assets/assets'

const Header = () => {
  
  return (
    <div className='flex flex-col md:flex-row flex-wrap bg-primary rounded-lg px-6 md:px-10 lg:px-20'>
      {/*----left sie -----*/}
      <div className='md:w-1/2 flex flex-col justify-center  gap-4 py-10 m-auto md:py-[10vw] md:mb-[-30px]  '>
        <p className='text-white text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight md:leading-tight lg:leadingg-tight'>
          Book appointment <br /> with Trusted Doctors
        </p>
        <div className='flex flex-col md:flex-row itmes-center gap-3 text-white text-sm font-light'>
          <img  className='w-28'
           src={assets.group_profiles} alt="" />
          <p>Simply browse through our extensive list of trusted doctor,<br /> schedule you appointment hassle-free</p>
          
        </div>
        <a className='w-8/12 flex itmes-center gap-2 bg-white px-4 py-3 rounded-full text-gray-600 text-sm m-auto md:m-0 hover:scale-105 transition-all duration-300' 
        href="#speciality">Book Appointment <img  className='w-3' src={assets.arrow_icon} alt="" /></a>
      </div>
      {/*----right sie -----*/}

      <div className='w-1/2 relative'>
        <img className='md:full md:absolute bottom-0 h-auto rounded-lg'
         src={assets.header_img} alt="" />
      </div>
    </div>
  )
}

export default Header