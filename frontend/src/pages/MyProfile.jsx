import React, { useState } from "react";
import { assets } from "./../assets/assets";

const MyProfile = () => {
  const [userData, setUsetData] = useState({
    name: "Satyagya Singh",
    image: assets.profile_pic,
    email: "OrangeEater@gmail.com",
    phone: "+1 212 3213 313",
    address: {
      line1: "57th Cross, Richmond ",
      line2: "Circle, church Road, London",
    },
    gender: "Male",
    dob: "2000-01-01",
  });

  const [isEditing, setIsEditing] = useState(false);
  return (
    <div className="max-w-lg flex  flex-col gap-2 text-sm">
      <img className="w-36 rounded" src={userData.image} alt="" />
      {isEditing ? (
        <input
          className="bg-gray-100 text-3xl font-medium max-w-60 mt-4"
          type="text"
          value={userData.name}
          onChange={(e) =>
            setUsetData((prev) => ({ ...prev, name: e.target.value }))
          }
        />
      ) : (
        <p className="font-medium text-3xl text-neutral-800 mt-4">{userData.name}</p>
      )}
      <hr className="bg-zinc-400 h-[1px] border-none"/>
      <div >
        <p className="text-neutral-500 underline mt-3">CONTACT INFO</p>
        <div className="grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-500">
          <p className="font-medium">Email :</p>
          <p className="text-blue-500">{userData.email}</p>
          <p className="font-medium">Phone:</p>

          {isEditing ? (
            <input
              className="bg-gray-100 max-w-52 "
              type="text"
              value={userData.phone}
              onChange={(e) =>
                setUsetData((prev) => ({ ...prev, phone: e.target.phone }))
              }
            />
          ) : (
            <p className="text-blue-400">{userData.phone}</p>
          )}

          <p className="font-medium">Address:</p>
          {isEditing ? (
            <p>
              <input
                className="bg-gray-100"
                value={userData.address.line1}
                onChange={(e) =>
                  setUsetData((prev) => ({
                    ...prev,
                    address: { ...prev.address, line1: e.target.value },
                  }))
                }
                type="text"
              />
              <br />
              <input
                className="bg-gray-100 mt-3"
                value={userData.address.line2}
                onChange={(e) =>
                  setUsetData((prev) => ({
                    ...prev,
                    address: { ...prev.address, line2: e.target.value },
                  }))
                }
                type="text"
              />
            </p>
          ) : (
            <div>
            <p className="text-gray-500">
              {userData.address.line1};
            </p>
            <p className="mt-3">
              {userData.address.line2};
            </p>
            </div>
          )}
        </div>
      </div>

      <div>
        <p className="text-neutral-500 underline mt-3">Basic Information</p>
        <div className="grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700">
          <p className="font-medium">Gender:</p>
          {isEditing ? (
            <select
              className="max-w-29 bg-gray-100"
              onChange={(e) =>
                setUsetData((prev) => ({ ...prev, gender: e.target.value }))
              }
              value={userData.gender}
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          ) : (
            <p className="text-gray-400">{userData.gender}</p>
          )}

          <p className="font-medium"> Birthday : </p>
          {isEditing ? (
            <input
              className="max-w-28 bg-gray-100"
              type="date"
              onChange={(e) =>
                setUsetData((prev) => ({ ...prev, dob: e.target.value }))
              }
              value={userData.dob}
            />
          ) : (
            <p className="text-gray-400">{userData.dob} </p>
          )}
        </div>
      </div>

      <div className="mt-10 ">
        {
          isEditing
          ?<button className="border border-primary px-8 py-2 rounded-full hover:bg-primary hover:text-white hover:transition-all" onClick={()=>setIsEditing(false)}>Save Info</button>
          :<button className="border border-primary px-8 py-2 rounded-full hover:bg-primary hover:text-white hover:transition-all" onClick={()=>setIsEditing(true)}>Edit</button>
        }
      </div>
    </div>
  );
};

export default MyProfile;
