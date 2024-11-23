import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { URL } from "../App"; // URL constant for backend
export const useUserPost = () => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);

  // Get token from local storage
  const getTokenFromLocalStorage = () => {
    return localStorage.getItem("accessToken");
  };
  const showUserPost = async () => {
    try {
      const token = getTokenFromLocalStorage();
      const response = await fetch(`${URL}/api/home/uploadedpost`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch user posts");
      }
      const data = await response.json();
      console.log(data);
      setPosts(data.posts);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    showUserPost();
  }, []);
  return { posts, showUserPost };
};
