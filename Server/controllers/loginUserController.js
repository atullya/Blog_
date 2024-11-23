const loginUserPost = require("../models/loginUserModel");
const uploadToCloudinary = require("../helper/cloudinaryhelper");
const fs = require("fs");
const cloudinary = require("../config/cloudinary.js");
const loginUserUpload = async (req, res) => {
  try {
    // Check if file is missing in request object
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "File is required. Please upload an Image",
      });
    }
    // Upload to Cloudinary
    const { url, publicId } = await uploadToCloudinary(req.file.path);
    // const { imageTitle, imageDescription } = req.body;
    const description = req.body.description;

    console.log(description);
    // Store the image URL, public ID, and uploaded userId in the database
    const newlyUploadedPost = new loginUserPost({
      description: description,
      url,
      publicId,
      uploadedBy: req.userInfo.userId,
    });

    // Save the image to the database
    await newlyUploadedPost.save();
    //delete the file from local storage
    fs.unlinkSync(req.file.path);

    res.status(201).json({
      success: true,
      message: "New Post uploaded successfully",
      image: newlyUploadedPost,
    });
  } catch (error) {
    console.log(error);
  }
};

const loginUserDelete = async (req, res) => {
  try {
    const getCurrentIdOfImage = req.params.id;
    const userId = req.userInfo.userId;
    const image = await loginUserPost.findById(getCurrentIdOfImage);
    if (!image) {
      return res.status(404).json({
        success: false,
        message: "Image not found",
      });
    }
    if (image.uploadedBy.toString() !== userId) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to delete this image",
      });
    }
    await cloudinary.uploader.destroy(image.publicId);
    await loginUserPost.findByIdAndDelete(getCurrentIdOfImage);
    return res.status(200).json({
      success: true,
      message: "Image Deleted Successfully",
    });
  } catch (error) {
    console.log(error);
  }
};
const displayuploadedPost = async (req, res) => {
  try {
    const loggedInUserId = req.userInfo.userId;
    if (!loggedInUserId) {
      return res.status(400).json({
        success: false,
        message: "You are not an authorized user!",
      });
    }
    // Fetch all posts uploaded by the logged-in user
    const userPosts = await loginUserPost.find({ uploadedBy: loggedInUserId });

    if (!userPosts || userPosts.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No posts found for this user",
      });
    }
    return res.status(200).json({
      success: true,
      posts: userPosts, // Return only the posts of the logged-in user
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while fetching posts",
    });
  }
};

module.exports = { loginUserUpload, loginUserDelete, displayuploadedPost };
