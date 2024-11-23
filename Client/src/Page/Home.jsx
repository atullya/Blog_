import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { URL } from "../App"; // URL constant for backend
import Navbar from "../Component/Navbar";
import Modal from "./HandleUserPost/Modal";
import UserPost from "./HandleUserPost/UserPost";

export default function Home() {
  const navigate = useNavigate();
  const [userdata, setuserdata] = useState("");
  const [images, setImages] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false); // State to manage modal visibility

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

  // Fetch images
  const showImage = async () => {
    const token = getTokenFromLocalStorage();
    if (!token) {
      console.error("No access token found in localStorage.");
      navigate("/");
      return;
    }
    try {
      let response = await fetch(`${URL}/api/image/getimage`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch images");
      }
      const data = await response.json();
      setImages(data.Images); // Store images in state
    } catch (error) {
      console.log("Error fetching images:", error);
    }
  };

  // Handle modal content submission
  const handlePost = (modalInput, imagePreview) => {
    console.log("Post Content:", modalInput);
    console.log("Uploaded Image URL:", imagePreview);
    // Add logic to send data to the backend if needed
  };

  // Open and close modal
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    ValidateUser();
    showImage();
  }, []);

  return (
    <div>
      <Navbar userdata={userdata} handleLogout={handleLogout} />
      <div className="container mx-auto p-4">
        {/* Input Box */}
        <div className="flex items-center justify-center bg-gray-100 mb-9 mt-6">
          <div className="w-96">
            <input
              type="text"
              placeholder={`What on Your Mind ${userdata?.username || ""}`}
              className="w-full p-4 border font-bold text-black border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none cursor-pointer"
              onClick={openModal} // Open modal on click
              readOnly
            />
          </div>
        </div>

        {/* Modal Component */}
        <Modal
          isOpen={isModalOpen}
          closeModal={closeModal}
          handlePost={handlePost}
          userdata={userdata}
        />

        {/* Display Images */}
        <div className="grid grid-cols-3 gap-4">
          {images && images.length > 0 ? (
            images.map((image, index) => (
              <div key={index} className="border p-4 rounded-lg shadow-lg">
                <img
                  src={image.url}
                  alt={image.imageTitle || `Image ${index}`}
                  className="w-full h-auto rounded-md"
                />
                <div className="mt-2 text-center">
                  <h3 className="text-lg font-semibold">
                    {image.imageTitle || "Untitled"}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {image.imageDescription || "No description available"}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">No images available</p>
          )}
        </div>

        <h1 className="text-center text-red-500 font-bold text-3xl mt-8">
          My Posts
        </h1>
      <UserPost/>
      </div>
    </div>
  );
}
