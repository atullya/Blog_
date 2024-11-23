import React, { useEffect, useState } from "react";
import AdminNavbar from "./AdminNavbar";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function ListAllUser() {
  const [userData, setUserData] = useState([]);
  const navigate = useNavigate();
  const getTokenFromLocalStorage = () => {
    return localStorage.getItem("accessToken");
  };

  const getAllUser = async () => {
    const token = getTokenFromLocalStorage();
    if (!token) {
      console.log("Authorization header missing");
      navigate("/");
      return;
    }
    try {
      let response = await fetch("http://localhost:3000/api/admin/getalluser", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }
      const data = await response.json();
      console.log("Fetched Users:", data);
      setUserData(data.Users);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllUser();
  }, []);

  let handleDelete = async (id) => {
    const token = localStorage.getItem("accessToken"); // Ensure token is retrieved
    if (!token) {
      toast.error("Authentication token is missing. Please log in.");
      return;
    }

    try {
      let response = await fetch(
        `http://localhost:3000/api/admin/removeuser/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete user");
      }

      const data = await response.json();

      if (data.success) {
        toast.success(data.message); // Show success message
        getAllUser(); // Refresh the user list after deletion
      } else {
        toast.error("Failed to delete user. Please try again.");
      }
    } catch (error) {
      toast.error(error.message || "An unexpected error occurred.");
    }
  };

  return (
    <AdminNavbar>
      <div className="p-6 space-y-6">
        <h1 className="text-3xl font-semibold text-gray-800">All Users Data</h1>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-lg border border-gray-200">
            <thead className="bg-gray-100 text-left">
              <tr>
                <th className="py-3 px-6 text-sm font-semibold text-gray-700">
                  S.N
                </th>
                <th className="py-3 px-6 text-sm font-semibold text-gray-700">
                  ID
                </th>
                <th className="py-3 px-6 text-sm font-semibold text-gray-700">
                  Username
                </th>
                <th className="py-3 px-6 text-sm font-semibold text-gray-700">
                  Email
                </th>
                <th className="py-3 px-6 text-sm font-semibold text-gray-700">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {userData && userData.length > 0 ? (
                userData.map((user, index) => (
                  <tr key={user._id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-6 text-sm text-gray-800">
                      {index + 1}
                    </td>
                    <td className="py-3 px-6 text-sm text-gray-800">
                      {user._id}
                    </td>
                    <td className="py-3 px-6 text-sm text-gray-800">
                      {user.username}
                    </td>
                    <td className="py-3 px-6 text-sm text-gray-800">
                      {user.email}
                    </td>
                    <td className="py-3 px-6 text-sm text-gray-800 space-x-2">
                      <button
                        onClick={() => {
                          handleDelete(user._id);
                        }}
                        className="px-4 py-2 text-sm text-white bg-red-500 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300"
                      >
                        X
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="5"
                    className="py-3 px-6 text-center text-gray-500"
                  >
                    No Users Found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <ToastContainer />
    </AdminNavbar>
  );
}
