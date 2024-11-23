const express = require("express");
const {
  loginUserUpload,
  loginUserDelete,
  displayuploadedPost,
} = require("../controllers/loginUserController");
const authMiddleWare = require("../middleware/authMiddleware");
const uploadMiddleware = require("../middleware/uploadMiddleware");
const loginUserRoutes = express.Router();

loginUserRoutes.post(
  "/upload",
  authMiddleWare,
  uploadMiddleware.single("image"),
  loginUserUpload
);

loginUserRoutes.delete("/delete/:id", authMiddleWare, loginUserDelete);
loginUserRoutes.get("/uploadedpost", authMiddleWare, displayuploadedPost);

module.exports = loginUserRoutes;
