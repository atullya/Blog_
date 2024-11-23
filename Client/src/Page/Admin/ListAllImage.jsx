import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminNavbar from "./AdminNavbar"; // Adjust the import if the path is different
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function ListAllImage() {
  const navigate = useNavigate();
  const [images, setImages] = useState([]);

  // Fetch token from localStorage
  const getTokenFromLocalStorage = () => {
    return localStorage.getItem("accessToken");
  };

  // Fetch images from API
  const showImage = async () => {
    const token = getTokenFromLocalStorage();
    if (!token) {
      console.error("No access token found in localStorage.");
      navigate("/"); // Redirect to login if no token is found
      return;
    }
    try {
      let response = await fetch(`http://localhost:3000/api/image/getimage`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch images");
      }
      const data = await response.json();
      console.log("Fetched images:", data); // Log the data to check the structure
      setImages(data.Images); // Store images in state
    } catch (error) {
      console.log("Error fetching images:", error);
    }
  };

  // Delete an image
  const deleteImage = async (imageId) => {
    const token = getTokenFromLocalStorage();
    if (!token) {
      console.error("No access token found in localStorage.");
      return;
    }
    try {
      const response = await fetch(
        `http://localhost:3000/api/image/remove/${imageId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete image");
      }

      const data = await response.json();
      if (data.success) {
        toast.success(data.message);
        showImage();
      }
      console.log("Image deleted successfully");
    } catch (error) {
      console.log("Error deleting image:", error);
    }
  };

  useEffect(() => {
    showImage();
  }, []);

  return (
    <AdminNavbar>
      <div className="min-h-screen bg-gray-50 p-6">

      <h1 className="text-lg sm:text-xl font-semibold text-gray-800 text-center mb-9">
          Admin Panel
        </h1>
        <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">
          All Images
        </h1>
        <div className="grid grid-cols-3 gap-4">
          {images && images.length > 0 ? (
            images.map((image, index) => (
              <div key={index} className="border p-4 rounded-lg shadow-lg">
                <img
                  src={image.url} // Assuming the image URL is in 'url' key
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
                  {/* Delete Button */}
                  <button
                    onClick={() => deleteImage(image._id)} // Pass image ID to delete
                    className="mt-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition duration-300"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">No images available</p>
          )}
        </div>
      </div>
      <ToastContainer />
    </AdminNavbar>
  );
}
