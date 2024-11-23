import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { URL } from "../App";
import { storeTokenInLocalStorage } from "./TokenLocalStorage";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  let handleLogin = async () => {
    try {
      // Prepare login data
      let loginData = { email, password };

      // Send login data to the API via a POST request
      let response = await fetch(`${URL}/api/auth/login`, {
        method: "POST", // Specify the HTTP method
        headers: {
          "Content-Type": "application/json", // Specify the content type
        },
        body: JSON.stringify(loginData), // Send loginData in the request body
      });

      // Parse the response
      let data = await response.json();
      console.log(data);
      let storetoken = storeTokenInLocalStorage(data.accessToken);

      if (data.success) {
        if (
          email === import.meta.env.VITE_APP_EMAIL &&
          password === import.meta.env.VITE_APP_PASSWORD
        ) {
          navigate("/admin");
          toast.success(data.message || "Login successful! Welcome back.");
        } else {
          navigate("/home");
          toast.success(data.message || "Login successful! Welcome back.");
        }
      } else {
        console.log(data);
      }
    } catch (error) {
      // Handle error
      toast.error("An error occurred while logging in.");
      console.error(error);
    }
  };

  let handleSubmit = (e) => {
    e.preventDefault();

    // Validate input fields
    if (email === "" || password === "") {
      toast.error("🚨 All fields are required! Please fill them out.");
      return; // Exit function if validation fails
    }

    // Proceed with login if validation passes
    handleLogin();
  };

  return (
    <div className="flex items-center justify-center ">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md"
      >
        {/* <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">Login</h2> */}

        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-gray-700 font-medium mb-2"
          >
            Email:
          </label>
          <input
            type="email"
            placeholder="Enter Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-gray-700 font-medium mb-2"
          >
            Password:
          </label>
          <input
            type="password"
            placeholder="Enter Your Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-6 text-center">
          <p className="text-gray-600 text-sm">
            Don't have an account?{" "}
            <a href="/register" className="text-blue-600 hover:underline">
              Register Here
            </a>
          </p>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition duration-300"
        >
          Login
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Login;
