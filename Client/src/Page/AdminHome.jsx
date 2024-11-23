import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { URL as BASE_URL } from "../App";
import upload_area from "../assets/upload_area.png";
import AdminNavbar from "./Admin/AdminNavbar";

export default function AdminHome() {
  const navigate = useNavigate();
  const [adminData, setAdminData] = useState(null);
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false); // New state for loading

  const getTokenFromLocalStorage = () => {
    return localStorage.getItem("accessToken");
  };

  const handleAdminLogin = async () => {
    const token = getTokenFromLocalStorage();
    if (!token) {
      navigate("/");
      return;
    }

    try {
      const response = await fetch(`${BASE_URL}/api/admin/welcome`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error("Failed to fetch admin data");

      const data = await response.json();
      setAdminData(data.details);
    } catch (error) {
      console.error("Error fetching admin data:", error.message);
      toast.error("Session expired. Please log in again.");
      navigate("/");
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setPreview(previewUrl);
      setImage(file);
    }
  };

  const handleImageUpload = async () => {
    const token = getTokenFromLocalStorage();

    if (!image) {
      toast.error("Please select an image.");
      return;
    }

    if (!title || !description) {
      toast.error("Title and description are required.");
      return;
    }

    const formData = new FormData();
    formData.append("image", image);
    formData.append("title", title);
    formData.append("description", description);

    setLoading(true); // Set loading to true when upload starts

    try {
      const response = await fetch(`${BASE_URL}/api/image/upload`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Image upload failed");
      }

      toast.success("Image uploaded successfully!");
      setImage(null);
      setPreview(null);
      setTitle("");
      setDescription("");
    } catch (error) {
      console.error("Error uploading image:", error.message);
      toast.error("Error uploading image. Please try again.");
    } finally {
      setLoading(false); // Set loading to false after upload completes
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleImageUpload();
  };

  useEffect(() => {
    handleAdminLogin();
  }, []);

  return (
    <AdminNavbar>
      <div className="min-h-screen bg-gray-50 flex flex-col items-center py-12">
        <ToastContainer />
        <h1 className="text-lg sm:text-xl font-semibold text-gray-800 text-center mt-[-50px]">
          Admin Panel
        </h1>
        <div className="bg-white p-8 rounded-xl shadow-lg w-3/4 max-w-xl">
          <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">
            Welcome, {adminData && adminData.username}
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex flex-col items-center">
              <p className="text-xl font-medium text-gray-700 mb-3">
                Upload Image
              </p>
              <label htmlFor="image" className="cursor-pointer">
                <input
                  type="file"
                  id="image"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
                {preview ? (
                  <img
                    src={preview}
                    alt="Uploaded Preview"
                    className="mt-4 w-60 h-auto rounded-lg shadow-md"
                  />
                ) : (
                  <img
                    src={upload_area}
                    alt="Upload Area"
                    className="mt-4 w-60 h-auto rounded-lg shadow-md"
                  />
                )}
              </label>
            </div>

            <div className="flex flex-col items-center mb-6">
              <p className="text-xl font-medium text-gray-700 mb-3">
                Image Title
              </p>
              <input
                type="text"
                id="title"
                name="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-64 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter image title"
              />
            </div>

            <div className="flex flex-col items-center mb-6">
              <p className="text-xl font-medium text-gray-700 mb-3">
                Image Description
              </p>
              <input
                type="text"
                id="description"
                name="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-64 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter image description"
              />
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300"
                disabled={loading} // Disable button during loading
              >
                {loading ? "Uploading..." : "Upload"}{" "}
                {/* Change text based on loading */}
              </button>
            </div>
          </form>
        </div>
      </div>
    </AdminNavbar>
  );
}
