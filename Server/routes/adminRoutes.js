const express = require("express");
const authMiddleWare = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");
const User = require("../models/userModel");
const {
  getAllUserDetail,
  removeUser,
} = require("../controllers/adminController");
const router = express.Router();

router.get("/welcome", authMiddleWare, adminMiddleware, (req, res) => {
  res.json({ message: "Welcome", details: req.userInfo });
});

router.get("/getalluser", authMiddleWare, adminMiddleware, getAllUserDetail);
router.delete("/removeuser/:id", authMiddleWare, adminMiddleware, removeUser);

module.exports = router;
