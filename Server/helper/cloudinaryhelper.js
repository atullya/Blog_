const cloudinary = require("../config/cloudinary.js");

const uploadToCloudinary = async (filePath) => {
  try {
    const uploadResult = await cloudinary.uploader.upload(filePath);
    return {
      url: uploadResult.secure_url,
      publicId: uploadResult.public_id,
    };
  } catch (error) {
    console.log("Error while uploading to cloudinary ", error);
    throw new Error("Error while uploading to cloudinary");
  }
};
module.exports = uploadToCloudinary;
