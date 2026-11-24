import { useState } from "react";

import {
  ShoppingCart,
  UserRound,
  ChevronDown
} from "lucide-react";
import { Link } from "react-router-dom";

import logo from "../../assets/logos/logo.png";

function Navbar() {

  const [user, setUser] = useState(() => {
    return JSON.parse(localStorage.getItem("user"));
  });

  const handleLogout = () => {
    localStorage.removeItem("user");

    setUser(null);

    alert("Logged out successfully!");
  };

  return (
    <nav className="relative z-50 w-full bg-black text-white border-b border-white/10">

      <div className="w-full min-h-[96px] px-8 lg:px-12 grid grid-cols-[1fr_auto_1fr] items-center">

        {/* LOGO */}
        <div className="flex items-center gap-3 justify-self-start">

          <img
            src={logo}
            alt="CHANGARATH MART"
            className="w-14 h-14 object-contain"
          />

          <h1 className="text-xl lg:text-2xl font-extrabold tracking-wide whitespace-nowrap">
            CHANGARATH
            <span className="text-yellow-400"> MART</span>
          </h1>

        </div>

        {/* NAVIGATION */}
        <div className="hidden lg:flex items-center justify-center gap-8 text-lg font-bold">

          <a href="#home" className="bg-red-600 px-5 py-3 rounded-full">
            Home
          </a>

          <a href="#categories" className="flex items-center gap-1 hover:text-yellow-400 transition">
            Categories
            <ChevronDown size={14}/>
          </a>

          <a href="#offers" className="hover:text-yellow-400 transition">
            Offers
          </a>

          <a href="#about" className="hover:text-yellow-400 transition">
            About
          </a>

          <a href="#contact" className="hover:text-yellow-400 transition">
            Contact
          </a>

        </div>

        {/* CART AND LOGIN / LOGOUT */}
        <div className="flex items-center justify-self-end gap-5">

          <button className="relative">
            <ShoppingCart size={26}/>

            <span className="absolute -top-3 -right-3 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              0
            </span>
          </button>

          {user ? (

            <button
              onClick={handleLogout}
              className="flex items-center gap-2 border border-red-500 text-red-500 px-5 py-3 rounded-full hover:bg-red-500 hover:text-white transition whitespace-nowrap"
            >
              <UserRound size={18}/>
              Logout
            </button>

          ) : (

            <Link
              to="/login"
              className="hidden sm:flex items-center gap-2 border border-white/40 rounded-full px-5 py-3 hover:bg-yellow-400 hover:text-black transition whitespace-nowrap"
            >
              <UserRound size={18}/>
              Login / Signup
            </Link>

          )}

        </div>

      </div>

    </nav>
  );
}

export default Navbar;
