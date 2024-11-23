import React from "react";
import { useNavigate } from "react-router-dom";
import AdminNavbar from "./AdminNavbar";

const AdminLogout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    navigate("/");
  };

  return (
    <AdminNavbar>
      <div className="min-h-screen flex justify-center items-center">
        <button
          onClick={handleLogout}
          className="px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition duration-300"
        >
          Logout
        </button>
      </div>
    </AdminNavbar>
  );
};

export default AdminLogout;
