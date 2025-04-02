import { useNavigate } from "react-router-dom";
import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";

const TopDoctors = () => {
  const { doctors } = useContext(AppContext);
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center gap-4 my-16 text-gray-900 md:mx-10">
      <h1 className="text-3xl font-medium">Top Doctors to Book</h1>
      <p className="sm:w-1/3 text-center text-sm">
        Simply browse through our extensive list of tursted doctors
      </p>
      <div className="w-full grid grid-cols-autoFill gap-4 pt-5 gap-y-6 sm:px-0 ">
        {doctors.slice(0, 10).map((item, index) => (
          <div
            key={index}
            onClick={() => {
              navigate(`../appointments/${item._id}`);
              scrollTo(0, 0);
            }}
            className="border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:-translate-y-2 transition-all duration-500"
          >
            <img className="bg-blue-50" src={item.image} alt="" />
            <div className="p-4">
              <div
                className={`flex items-center gap-2 text-sm text-center ${
                  item.available ? "text-green-500" : "text-red-400"
                }`}
              >
                <p
                  className={`w-2 h-2 rounded-full ${
                    item.available ? "bg-green-500" : "bg-red-400"
                  }`}
                ></p>
                <p>{item.available ? "Available" : "Unavailable"}</p>
              </div>
              <p className="text-gray-900 text-lg font-medium ">{item.name}</p>
              <p className="text-gray-600">{item.speciality}</p>
            </div>
          </div>
        ))}
      </div>
      <button
        onClick={() => {
          navigate("/doctors");
          scrollTo(0, 0);
        }}
        className="bg-blue-50 text-gray-600 px-12 py-3 rounded-full mt-10 hover:scale-105 transition-all duration-300"
      >
        More
      </button>
    </div>
  );
};

export default TopDoctors;
