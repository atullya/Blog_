import React, { useState } from "react";

import ViewUserPost from "./ViewUserPost";

function SettingDashboard() {
  const [activeSection, setActiveSection] = useState("password");
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
 
  const handleSectionChange = (section) => {
    setActiveSection(section);
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev); // Toggle the password visibility
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <aside className="w-[300px] bg-gray-800 text-white p-4 h-screen">
        <h2 className="text-xl font-bold mb-4">User Dashboard</h2>
        <ul className="space-y-4">
          <li
            className={`cursor-pointer ${
              activeSection === "password" ? "font-bold" : ""
            }`}
            onClick={() => handleSectionChange("password")}
          >
            Change Password
          </li>
          <li
            className={`cursor-pointer ${
              activeSection === "posts" ? "font-bold" : ""
            }`}
            onClick={() => handleSectionChange("posts")}
          >
            View Your Posts
          </li>
        </ul>
      </aside>

      {/* Content Area */}
      <div className="w-3/4 p-6">
        {activeSection === "password" && (
          <div>
            <h3 className="text-2xl font-semibold mb-4">Change Password</h3>
            <form>
              <div className="mb-4">
                <label className="block text-lg">Current Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter current password"
                    className="w-full p-3 border border-gray-300 rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-600"
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-lg">New Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter new password"
                    className="w-full p-3 border border-gray-300 rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-600"
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-lg">Confirm New Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Confirm new password"
                    className="w-full p-3 border border-gray-300 rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-600"
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </div>
              <button
                type="submit"
                className="w-full p-3 bg-blue-500 text-white rounded-lg"
              >
                Save Changes
              </button>
            </form>
          </div>
        )}

        {activeSection === "posts" && (
          <div>
            <h3 className="text-2xl font-semibold mb-4">Your Posts</h3>
            <ViewUserPost />
            {/* Add logic for displaying posts */}
          </div>
        )}
      </div>
    </div>
  );
}

export default SettingDashboard;
