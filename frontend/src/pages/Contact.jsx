import React from "react";
import { assets } from "../assets/assets";

const Contact = () => {
  return (
    <div className="text-center text-2xl pt-10 text-gray-500">
      <p>
        CONTACT <span className="text-gray-700 font-semibold">US</span>
      </p>
      <div className="my-10 flex flex-col md:flex-row justify-center gap-10 text-sm">
        <img
          className="w-full md:max-w-[360px] rounded-lg"
          src={assets.contact_image}
          alt=""
        />
        <div className="flex flex-col  justify-start items-start gap-8">
          <p className="font-semibold text-lg text-gray-600">OUR OFFICE</p>
          <div className= "flex flex-col items-start text-gray-500">
            <span>00000 Willms Station</span>
            <span>Suite 000, Washington, USA</span>
          </div>
          <div className="flex flex-col items-start text-gray-500">
            <span>Tel: (000) 000-0000</span>
            {/* <span>Email: satyagyasingh@gmail.com</span> */}
          </div>
          <p className="font-semibold text-lg text-gray-600">
            CAREERS AT PRESCRIPTO
          </p>
          <p>Learn more about our teams and job openings.</p>

          <button className="border border-black px-8 py-4 text-sm hover:bg-primary hover:text-white transition-all duration-300 hover:border-white">
            Explore Jobs
          </button>
        </div>
      </div>
    </div>
  );
};

export default Contact;
