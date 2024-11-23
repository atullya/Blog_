const mongoose = require("mongoose");
const loginUserSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  publicId: {
    type: String,
    required: true,
  },
  uploadedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
});
const loginUserPost = mongoose.model("loginUserUploads", loginUserSchema);
module.exports = loginUserPost;
