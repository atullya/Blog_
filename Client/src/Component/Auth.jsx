import React, { useState } from "react";
import Register from "./Register";
import Login from "./Login";

const Auth = () => {
  // State to track the active tab
  const [activeTab, setActiveTab] = useState("register");

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
      <div className="w-full max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
        {/* Tab buttons */}
        <div className="flex justify-around mb-6">
          <button
            className={`w-1/2 py-2 font-semibold text-lg ${activeTab === "register" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-800"} rounded-tl-lg transition duration-200`}
            onClick={() => setActiveTab("register")}
          >
            Register
          </button>
          <button
            className={`w-1/2 py-2 font-semibold text-lg ${activeTab === "login" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-800"} rounded-tr-lg transition duration-200`}
            onClick={() => setActiveTab("login")}
          >
            Login
          </button>
        </div>

        {/* Tab content */}
        <div>
          {activeTab === "register" && <Register />}
          {activeTab === "login" && <Login />}
        </div>
      </div>
    </div>
  );
};

export default Auth;
    