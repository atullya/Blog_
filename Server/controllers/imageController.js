const Image = require("../models/imageModel");
const uploadToCloudinary = require("../helper/cloudinaryhelper");
const fs = require("fs");
const cloudinary = require("../config/cloudinary.js");

const uploadImage = async (req, res) => {
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
    const imageTitle = req.body.title;
    const imageDescription = req.body.description;
    console.log(imageTitle);
    // Store the image URL, public ID, and uploaded userId in the database
    const newlyUploadedImage = new Image({
      url,
      publicId,
      uploadedBy: req.userInfo.userId,
      imageTitle,
      imageDescription,
    });

    // Save the image to the database
    await newlyUploadedImage.save();
    //delete the file from local storage
    fs.unlinkSync(req.file.path);

    res.status(201).json({
      success: true,
      message: "Image uploaded successfully",
      image: newlyUploadedImage,
    });
  } catch (error) {
    console.log(error);
  }
};

const fetchUploadedImage = async (req, res) => {
  try {
    const findImage = await Image.find({});
    if (!findImage) {
      return res.status(404).json({
        success: false,
        message: "Image not found!!",
      });
    }
    return res.status(201).json({
      success: true,
      Images: findImage,
    });
  } catch (error) {
    console.log(error);
  }
};

const deleteImageController = async (req, res) => {
  try {
    const getCurrentIdOfImage = req.params.id;
    const userId = req.userInfo.userId;
    const image = await Image.findById(getCurrentIdOfImage);
    if (!image) {
      return res.status(404).json({
        success: false,
        message: "Image not found",
      });
    }
    //check if the image is uploaded by current user or not who is trying to delete
    if (image.uploadedBy.toString() !== userId) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to delete this image",
      });
    }
    await cloudinary.uploader.destroy(image.publicId);
    await Image.findByIdAndDelete(getCurrentIdOfImage);
    return res.status(200).json({
      success: true,
      message: "Image Deleted Successfully",
    });
  } catch (error) {
    console.log(error);
  }
};
module.exports = { uploadImage, fetchUploadedImage, deleteImageController };
