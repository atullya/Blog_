import React from "react";
import { useUserPost } from "../Hooks/useUserPost";

function ViewUserPost() {
  const { posts, showUserPost } = useUserPost();
  const getTokenFromLocalStorage = () => {
    return localStorage.getItem("accessToken");
  };
  const deleteUserPost = async (id) => {
    try {
      let token = getTokenFromLocalStorage();
      let response = await fetch(
        `http://localhost:3000/api/home/delete/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      let data = await response.json();
      if (data.success) {
        alert(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <div className="flex gap-[20px] relative">
        {posts.length > 0 ? (
          posts.map((post, index) => (
            <div
              key={index}
              className="bg-white shadow-lg rounded-lg overflow-hidden relative"
            >
              {/* Post Description */}
              {post.description && (
                <div className="p-4">
                  <p className="text-gray-800 text-lg font-semibold text-center">
                    {post.description}
                  </p>
                </div>
              )}

              {/* Delete Button */}
              <div
                className="absolute top-2 right-2 cursor-pointer text-red-600 font-bold"
                onClick={() => deleteUserPost(post._id)} // Assuming showUserPost handles post deletion
              >
                Delete
              </div>

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
            </div>
          ))
        ) : (
          <p className="text-center text-gray-600">No Posts Yet</p>
        )}
      </div>
    </div>
  );
}

export default ViewUserPost;
