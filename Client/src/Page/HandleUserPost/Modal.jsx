import React, { useState } from "react";
import avatar from "../../assets/avatar.png";

const Modal = ({ isOpen, closeModal, handlePost, userdata }) => {
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  const getTokenFromLocalStorage = () => {
    return localStorage.getItem("accessToken");
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setImage(file); // Store the file for submission
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadNewPost = async () => {
    try {
      const token = getTokenFromLocalStorage();
      const formData = new FormData();
      formData.append("description", description);
      formData.append("image", image);

      let response = await fetch("http://localhost:3000/api/home/upload", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        setErrorMessage(data.message || "Image upload failed");
        return;
      }

      if (data.success) {
        alert(data.message);
        setImage(null);
        setDescription("");
      }
    } catch (error) {
      console.log(error);
      setErrorMessage("Something went wrong, please try again.");
    }
  };

  const handleSubmit = () => {
    setIsUploading(true);
    handlePost(description, imagePreview); // Pass input and image data to parent component
    uploadNewPost().finally(() => setIsUploading(false)); // Re-enable button after submission
    closeModal(); // Close the modal after posting
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-6 shadow-lg w-96">
        <h2 className="text-lg font-semibold mb-4 text-center">
          Post Something
        </h2>
        <div className="flex gap-5 items-center mb-5">
          <img className="w-8 h-8 rounded-full" src={avatar} alt="user photo" />
          <p>{userdata?.username.toUpperCase()}</p>
        </div>

        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Write something..."
          className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none h-32"
        ></textarea>

        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Upload an Image
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200"
          />
        </div>

        {imagePreview && (
          <div className="mt-4">
            <p className="text-sm font-medium text-gray-700 mb-2">
              Image Preview:
            </p>
            <img
              src={imagePreview}
              alt="Uploaded Preview"
              className="w-32 h-32 object-cover rounded-lg shadow-md mx-auto"
            />
          </div>
        )}

        {errorMessage && (
          <div className="text-red-500 text-sm mt-2">{errorMessage}</div>
        )}

        <div className="flex justify-between mt-4">
          <button
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400"
            onClick={closeModal}
          >
            Cancel
          </button>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
            onClick={handleSubmit}
            disabled={isUploading}
          >
            {isUploading ? "Posting..." : "Post"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
