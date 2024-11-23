const express = require("express");
const authMiddleWare = require("../middleware/authMiddleware");
const { logoutUser } = require("../controllers/authController");
const router = express.Router();

router.get("/welcome", authMiddleWare, (req, res) => {
  res.json({ message: "Welcome", details: req.userInfo });
});
router.get("/logout", authMiddleWare, logoutUser);

module.exports = router;
