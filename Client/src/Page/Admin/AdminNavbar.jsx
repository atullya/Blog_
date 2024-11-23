import React from "react";
import logoo from "../../assets/logoo.png";
import { NavLink } from "react-router-dom";

export default function AdminNavbar({ children }) {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="bg-gradient-to-b from-[#0D3B29] to-[#1F8A50] w-[300px] flex flex-col items-center py-6 text-white">
        <div className="logo">
          <img src={logoo} className="mb-10 w-[90%]" alt="Logo" />
        </div>
        <nav className="flex flex-col gap-5 mt-5 w-full text-center">
          <NavLink
            to={"/admin"}
            className="py-2 hover:bg-[#005a20] hover:text-white transition duration-300 ease-in-out"
          >
            Add Photo
          </NavLink>
          <NavLink
            to={"/admin/list"}
            className="py-2 hover:bg-[#005a20] hover:text-white transition duration-300 ease-in-out"
          >
            List All Photo
          </NavLink>
          <NavLink
            to={"/admin/alluser"}
            className="py-2 hover:bg-[#005a20] hover:text-white transition duration-300 ease-in-out"
          >
            List All Users
          </NavLink>
          <NavLink
            to={"/admin/logout"}
            className="py-2 hover:bg-[#005a20] hover:text-white transition duration-300 ease-in-out"
          >
            Logout
          </NavLink>
        </nav>
      </div>

      {/* Top Row with centered h1 */}

      
  

      {/* Main Content Area */}
      <div className="flex-1 bg-gray-50 p-6">{children}</div>
    </div>
  );
}
