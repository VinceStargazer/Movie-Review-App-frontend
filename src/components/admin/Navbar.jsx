import React from "react";
import { Link, NavLink } from "react-router-dom";
import { AiOutlineHome } from "react-icons/ai";
import { BiMovie } from "react-icons/bi";
import { HiOutlineUsers } from "react-icons/hi";
import { FiLogOut } from "react-icons/fi";
import { useAuth } from "../../hooks";

export default function Navbar() {
  const { handleLogout } = useAuth();

  return (
    <nav className="w-48 min-h-screen bg-secondary border-r border-gray-300 dark:border-secondary mr-3">
      <div className="flex flex-col justify-between pl-5 h-screen sticky top-0">
        <ul>
          <li className="mb-8">
            <Link to="/">
              <img src="./logo.png" alt="logo" className="h-14 p-2" />
            </Link>
          </li>
          <li>
            <NavItem to="/">
              <AiOutlineHome />
              <span>Home</span>
            </NavItem>
          </li>
          <li>
            <NavItem to="/movies">
              <BiMovie />
              <span>Movies</span>
            </NavItem>
          </li>
          <li>
            <NavItem to="/actors">
              <HiOutlineUsers />
              <span>Actors</span>
            </NavItem>
          </li>
        </ul>
        <div className="flex flex-col items-start pl-5 pb-5">
          <span className="font-semibold text-white text-lg pb-2">Admin</span>
          <button
            onClick={handleLogout}
            className="flex items-center text-dark-subtle text-sm hover:text-white transition space-x-1"
          >
            <FiLogOut />
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}

const NavItem = ({ children, to }) => {
  return (
    <NavLink
      className={({ isActive }) =>
        (isActive ? "text-white" : "text-gray-400") +
        " flex items-center text-lg space-x-2 p-2 hover:opacity-80 transition"
      }
      to={to}
    >
      {children}
    </NavLink>
  );
};
