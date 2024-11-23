const express = require("express");
const router = express.Router();
const authMiddleWare = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");
const uploadMiddleware = require("../middleware/uploadMiddleware");
const {
  uploadImage,
  fetchUploadedImage,
  deleteImageController,
} = require("../controllers/imageController");
router.post(
  "/upload",
  authMiddleWare,
  adminMiddleware,
  uploadMiddleware.single("image"),
  uploadImage
);

router.get("/getimage", authMiddleWare, fetchUploadedImage);

router.delete(
  "/remove/:id",
  authMiddleWare,
  adminMiddleware,
  deleteImageController
);
module.exports = router;
