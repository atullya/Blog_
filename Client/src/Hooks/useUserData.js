// hooks/useUserData.js

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { URL } from "../App"; // URL constant for backend

export const useUserData = () => {
  const navigate = useNavigate();
  const [userdata, setuserdata] = useState("");

  // Get token from local storage
  const getTokenFromLocalStorage = () => {
    return localStorage.getItem("accessToken");
  };

  // Validate user
  const ValidateUser = async () => {
    const token = getTokenFromLocalStorage();
    if (!token) {
      console.error("No access token found in localStorage.");
      navigate("/"); // Redirect to login if no token is found
      return;
    }
    try {
      let response = await fetch(`${URL}/api/home/welcome`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch user data");
      }
      const data = await response.json();
      setuserdata(data.details); // Store user data
    } catch (error) {
      console.log("Error fetching user data:", error);
    }
  };

  // Logout functionality
  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    navigate("/");
  };

  useEffect(() => {
    ValidateUser();
  }, []);

  return {
    userdata,
    handleLogout,
  };
};
