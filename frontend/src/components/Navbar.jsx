import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { assets } from '../assets/assets';
import { X } from 'lucide-react';

const Navbar = () => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const [token, setToken] = useState(true);

  const navItems = [
    { path: '/', label: 'HOME' },
    { path: '/doctors', label: 'ALL DOCTORS' },
    { path: '/about', label: 'ABOUT' },
    { path: '/contact', label: 'CONTACT' }
  ];

  return (
    <nav className="relative">
      <div className="flex items-center justify-between text-sm py-4 mb-5 border-b border-gray-700 px-4">
        <Link to="/">
          <img className="w-32 md:w-44 cursor-pointer" src={assets.logo} alt="Logo" />
        </Link>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex items-start gap-5 font-medium">
          {navItems.map((item) => (
            <NavLink key={item.path} to={item.path} className="group">
              <li className="py-1">{item.label}</li>
              <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden group-hover:block group-hover:bg-slate-300" />
            </NavLink>
          ))}
        </ul>

        {/* Desktop Auth Section */}
        <div className="hidden md:block">
          {token ? (
            <div className="flex items-center gap-2 cursor-pointer group relative">
              <img className="w-8 rounded-full" src={assets.profile_pic} alt="Profile" />
              <img className="w-2.5" src={assets.dropdown_icon} alt="Dropdown" />
              <div className="absolute top-0 right-0 pt-14 font-medium text-gray-600 z-20 hidden group-hover:block">
                <div className="min-w-40 bg-stone-100 rounded flex flex-col gap-4 p-4 shadow-lg">
                  <p onClick={() => navigate("my-profile")} className="hover:text-black cursor-pointer">
                    My Profile
                  </p>
                  <p onClick={() => navigate("my-appointments")} className="hover:text-black cursor-pointer">
                    My Appointments
                  </p>
                  <p onClick={() => setToken(false)} className="hover:text-black cursor-pointer">
                    Logout
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <button
              onClick={() => navigate("/login")}
              className="bg-primary text-white px-8 py-3 rounded-full font-light"
            >
              Create Account
            </button>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button 
          onClick={() => setShowMenu(true)}
          className="md:hidden"
        >
          <img className="w-6" src={assets.menu_icon} alt="Menu" />
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {showMenu && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden" onClick={() => setShowMenu(false)} />
      )}

      {/* Mobile Menu */}
      <div className={`fixed top-0 right-0 bottom-0 w-64 bg-white z-50 transform transition-transform duration-300 ease-in-out ${showMenu ? 'translate-x-0' : 'translate-x-full'} md:hidden`}>
        <div className="p-4">
          <div className="flex items-center justify-between mb-8">
            <img className="w-32" src={assets.logo} alt="Logo" />
            <button onClick={() => setShowMenu(false)} className="p-2">
              <X className="w-6 h-6" />
            </button>
          </div>

          <ul className="flex flex-col gap-4">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setShowMenu(false)}
                className={({ isActive }) =>
                  `block py-2 px-4 rounded-lg transition-colors ${
                    isActive ? 'bg-primary text-white' : 'hover:bg-gray-100'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </ul>

          {/* Mobile Auth Section */}
          <div className="mt-8">
            {token ? (
              <div className="flex flex-col gap-4 p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <img className="w-8 rounded-full" src={assets.profile_pic} alt="Profile" />
                  <span className="font-medium">My Account</span>
                </div>
                <hr className="border-gray-200" />
                <button 
                  onClick={() => {
                    navigate("my-profile");
                    setShowMenu(false);
                  }}
                  className="text-left hover:text-primary"
                >
                  My Profile
                </button>
                <button 
                  onClick={() => {
                    navigate("my-appointments");
                    setShowMenu(false);
                  }}
                  className="text-left hover:text-primary"
                >
                  My Appointments
                </button>
                <button 
                  onClick={() => {
                    setToken(false);
                    setShowMenu(false);
                  }}
                  className="text-left text-red-500 hover:text-red-600"
                >
                  Logout
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  navigate("/login");
                  setShowMenu(false);
                }}
                className="w-full bg-primary text-white px-8 py-3 rounded-full font-light"
              >
                Create Account
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;