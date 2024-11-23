import React, { useEffect, useState } from "react";
import { URL } from "../../App";

export default function UserPost() {
  const getTokenFromLocalStorage = () => {
    return localStorage.getItem("accessToken");
  };

  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);

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
    } catch (err) {
      console.error(err);
      setError(err.message);
    }
  };

  useEffect(() => {
    showUserPost();
  }, []);

  return (
    <div className=" bg-gray-100 flex items-center justify-center p-6">
      <div className="w-full max-w-3xl">
        {error && <p className="text-red-500 text-center">{error}</p>}

        <div className="space-y-8">
          {posts.length > 0 ? (
            posts.map((post, index) => (
              <div
                key={index}
                className="bg-white shadow-lg rounded-lg overflow-hidden"
              >
                {/* Post Description */}
                {post.description && (
                  <div className="p-4">
                    <p className="text-gray-800 text-lg font-semibold text-center">
                      {post.description}
                    </p>
                  </div>
                )}

                {/* Post Image */}
                {post.url && (
                  <div className="w-[400px] h-[300px] m-auto">
                    <img
                      src={post.url}
                      alt={post.description || "User Post"}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                {/* Actions: Like & Comment */}
                <div className="p-4 flex justify-between items-center border-t">
                  {/* Like Button */}
                  <button className="flex items-center space-x-2 text-gray-600 hover:text-red-500">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      className="w-6 h-6"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"></path>
                    </svg>
                    <span>Like</span>
                  </button>

                  {/* Comment Button */}
                  <button className="flex items-center space-x-2 text-gray-600 hover:text-blue-500">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      className="w-6 h-6"
                      viewBox="0 0 24 24"
                    >
                      <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 11-3.8-10.4c.9.5 1.7 1.2 2.4 2.1l.1.1c.3.3.4.8.1 1.1-.3.3-.8.4-1.1.1l-.1-.1a6.6 6.6 0 00-1.8-1.6 6.6 6.6 0 104.1 10.7 6.73 6.73 0 002.8-4.8c0-.6-.5-1-1-1-.5 0-1 .4-1 1z"></path>
                    </svg>
                    <span>Comment</span>
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-600">No Posts Yet</p>
          )}
        </div>
      </div>
    </div>
  );
}
